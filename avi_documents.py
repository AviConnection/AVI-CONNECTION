"""Internal documents. PDF output uses the standard library and PDF base fonts."""
import textwrap, datetime, decimal
from pathlib import Path
from decimal import Decimal
KINDS={'factura':'Formato de factura','boleta':'Formato de boleta','operacion':'Constancia de registro de operación','nota':'Nota de pedido','orden':'Orden de trabajo','honorarios':'Formato de recibo por honorarios'}
def clean(s,n=160): return str(s or '').strip()[:n]
def validate(x):
    kind=x.get('kind'); assert kind in KINDS
    qty=Decimal(str(x.get('qty',1))); price=Decimal(str(x.get('price',0))); advance=Decimal(str(x.get('advance',0)))
    assert all(v.is_finite() for v in (qty,price,advance)) and 0<qty<=100000 and 0<=price<=1000000 and 0<=advance<=qty*price
    assert clean(x.get('concept')) and clean(x.get('customer'))
    assert advance.quantize(Decimal('.01')) <= (qty*price.quantize(Decimal('.01'))).quantize(Decimal('.01'))
    return dict(kind=kind,customer=clean(x.get('customer'),100),concept=clean(x.get('concept'),200),app=clean(x.get('app'),50),reference=clean(x.get('reference'),80),notes=clean(x.get('notes'),350),qty=str(qty),price=str(price.quantize(Decimal('.01'))),advance=str(advance.quantize(Decimal('.01'))),total=str((qty*price.quantize(Decimal('.01'))).quantize(Decimal('.01'))))
def pdf(docid,x,created):
    ticket=x['kind']=='boleta'; W,H=(226.77,545) if ticket else (595.28,841.89); m=15 if ticket else 44; out=[]; y=H-m
    def rect(x,y,w,h,c):out.append(f'{c} rg {x:.2f} {y:.2f} {w:.2f} {h:.2f} re f')
    def line(s,x,y,size=10,bold=False,c='0.12 0.17 0.20'):
        b=str(s).encode('cp1252','replace').hex();out.append(f'BT /F{2 if bold else 1} {size} Tf {c} rg 1 0 0 1 {x:.2f} {y:.2f} Tm <{b}> Tj ET')
    def text(s,size=10,bold=False,c='0.12 0.17 0.20',gap=5):
        nonlocal y
        for t in textwrap.wrap(str(s),width=max(12,int((W-2*m)/(size*.55))),break_long_words=True) or ['']:
            line(t,m,y,size,bold,c);y-=size+gap
    teal='0.02 0.35 0.36'; coral='0.78 0.35 0.33'; rect(0,H-8,W,8,teal)
    y-=9; logo=28 if ticket else 40; out.append(f'q {logo} 0 0 {logo} {m} {y-logo} cm /Logo Do Q'); out.append(f'q {logo} 0 0 {logo} {m+logo+8} {y-logo} cm /Brand Do Q'); y-=logo+13;text('SKAVYA  /  AVI CONNECTION',11 if ticket else 17,True,teal);y-=8;text(KINDS[x['kind']],12 if ticket else 22,True);text('Referencia interna: AVI-'+docid[:12].upper(),8 if ticket else 10);text('Fecha (UTC): '+created,8 if ticket else 10)
    y-=5;text('DOCUMENTO INTERNO · SIN VALIDEZ TRIBUTARIA',8 if ticket else 11,True,coral,3);text('No acredita un pago ni constituye un comprobante autorizado por SUNAT.',8 if ticket else 10,False,coral,3);y-=8
    text('EMISOR / AVI CONNECTION',9 if ticket else 11,True,teal);text('Cliente: '+x['customer'],9 if ticket else 12);text('Aplicación: '+(x['app'] or 'General'),9 if ticket else 11);text('Referencia: '+(x['reference'] or 'Sin referencia'),9 if ticket else 11);y-=4
    rect(m,y,W-2*m,1,teal);y-=18;text('DETALLE',9 if ticket else 11,True,teal);text(x['concept'],9 if ticket else 12,gap=3);text('Cantidad: '+x['qty']+'   Precio unitario: S/ '+x['price'],8 if ticket else 11,gap=3);y-=5
    y-=18 if ticket else 26;rect(m-3,y-9,W-2*m+6,26 if ticket else 35,'0.91 0.96 0.95');text('TOTAL REFERENCIAL: S/ '+x['total'],12 if ticket else 19,True,teal); y-=8;text('Adelanto previsto: S/ '+x['advance'],8 if ticket else 11);text('Saldo previsto: S/ '+str(Decimal(x['total'])-Decimal(x['advance'])),8 if ticket else 11);text('Estado: solicitud registrada · pago no verificado',8 if ticket else 10,False,coral,3)
    if x['notes']:
        y-=5;text('Observaciones',9 if ticket else 11,True);text(x['notes'],8 if ticket else 10,gap=2)
    # Fit content on ticket with longer descriptions by expanding page and translating drawing.
    if y<36:
        extra=36-y;H+=extra;out=['q 1 0 0 1 0 %.2f cm'%extra]+out+['Q']
    line('Conectamos ideas para crear realidades.',m,17,7 if ticket else 9,False,teal)
    stream='\n'.join(out).encode('ascii'); objs=[b'<< /Type /Catalog /Pages 2 0 R >>',b'<< /Type /Pages /Kids [3 0 R] /Count 1 >>',f'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 {W:.2f} {H:.2f}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> /XObject << /Logo 7 0 R /Brand 8 0 R >> >> /Contents 6 0 R >>'.encode(),b'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',b'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>',b'<< /Length '+str(len(stream)).encode()+b' >>\nstream\n'+stream+b'\nendstream'];
    for logo_name in ('skavya','avi-logo'):
        raw=(Path(__file__).resolve().parent/'avi-portal-assets'/'imagenes'/(logo_name+'-doc.jpg')).read_bytes();objs.append(b'<< /Type /XObject /Subtype /Image /Width 200 /Height 200 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length '+str(len(raw)).encode()+b' >>\nstream\n'+raw+b'\nendstream')
    buf=bytearray(b'%PDF-1.4\n%\xe2\xe3\xcf\xd3\n'); offsets=[0]
    for i,o in enumerate(objs,1):offsets.append(len(buf));buf.extend(f'{i} 0 obj\n'.encode()+o+b'\nendobj\n')
    pos=len(buf);buf.extend(('xref\n0 9\n0000000000 65535 f \n'+''.join(f'{v:010d} 00000 n \n' for v in offsets[1:])+f'trailer\n<< /Size 9 /Root 1 0 R >>\nstartxref\n{pos}\n%%EOF\n').encode());return bytes(buf)
