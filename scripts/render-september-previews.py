"""Original SVG product illustrations. All names, amounts and messages are sample data."""
from pathlib import Path
from html import escape
OUT=Path(__file__).resolve().parents[1]/'public/features'
WHITE='#F4F5F6'; MUTED='#A0A4AD'; BLUE='#38AEEA'; GREEN='#66D5BD'
def rect(x,y,w,h,fill='#15171C',stroke='#2D3038',r=14):
 return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke}"/>'
def text(x,y,s,size=20,color=WHITE,weight=400):
 return f'<text x="{x}" y="{y}" fill="{color}" font-family="Arial, sans-serif" font-size="{size}" font-weight="{weight}">{escape(s)}</text>'
def line(y,x=35,end=865):return f'<path d="M{x} {y}H{end}" stroke="#2D3038"/>'
def pill(x,y,s,w=140):return rect(x,y,w,34,'#0B2939','#164661',17)+text(x+14,y+23,s,15,BLUE,700)
def base(name,subtitle):return rect(1,1,898,658,'#0C0D10','#2D3038',18)+text(34,48,'talli.',28,WHITE,700)+text(120,47,'/ '+name,20,MUTED)+line(72)+text(35,116,subtitle,28,WHITE,700)
def save(name,body):
 footer=line(607)+text(35,638,'SEPTEMBER 2026  /  ILLUSTRATIVE PREVIEW  /  SAMPLE DATA',13,MUTED)
 (OUT/f'september-{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 660" role="img"><title>Talli {escape(name)} illustrative preview</title>{body}{footer}</svg>')
# Overwatch
s=base('Overwatch','Keep the conversation with the work.')
s+=rect(30,147,245,424)+text(51,180,'CONVERSATIONS',14,MUTED,700)
s+=rect(44,201,217,76,'#0B2939','#164661',10)+text(59,231,'Alex Morgan',20,WHITE,700)+text(59,256,'Technician · 1 unread',15,BLUE)
s+=text(60,325,'Team',20,WHITE,700)+text(60,351,'Shared conversation',15,MUTED)+line(373,45,260)
s+=text(60,414,'Office + field',17,MUTED)+text(60,440,'One connected day.',17,MUTED)
s+=rect(295,147,575,424)+text(320,184,'Alex Morgan',20,WHITE,700)+pill(701,161,'Job linked',139)
s+=rect(320,214,390,91,'#1B1E24')+text(340,247,'The customer approved the new scope.',17)+text(340,277,'Ready when you are.',17)
s+=rect(395,327,445,96,'#0B2939','#164661')+text(415,360,'Thanks. I have the revised estimate.',17)+text(415,389,'Heading to the job now.',17)
s+=rect(320,445,520,54,'#1B1E24')+text(339,479,'JOB #1042  ·  Kitchen faucet replacement',17,BLUE)
s+=rect(320,519,520,32,'#111318')+text(333,541,'Message Alex…',14,MUTED)
save('overwatch',s)
# Quick pay
s=base('Talli Field','Quick Pay')+pill(719,92,'Field payment',144)
s+=rect(30,147,405,424)+text(55,186,'PAYMENT DETAILS',14,MUTED,700)
s+=text(55,242,'Faucet installation',22,WHITE,700)+text(310,242,'$175.00',21)+text(55,277,'Labor · 1 service',16,MUTED)+line(304,55,410)
s+=text(55,342,'Faucet & fittings',22,WHITE,700)+text(320,342,'$110.00',21)+text(55,377,'Materials · 1 set',16,MUTED)+line(408,55,410)
s+=text(55,453,'Sample total',17,MUTED)+text(55,516,'$285.00',48,WHITE,700)
s+=rect(457,147,413,424)+text(482,186,'CONNECTED TO',14,MUTED,700)
s+=rect(479,216,369,90,'#1B1E24')+text(499,248,'CUSTOMER',13,BLUE,700)+text(499,281,'Morgan residence',23,WHITE,700)
s+=rect(479,329,369,108,'#1B1E24')+text(499,362,'JOB #1042',13,BLUE,700)+text(499,397,'Kitchen faucet replacement',20,WHITE,700)
s+=rect(479,476,369,64,'#1598D8','#1598D8')+text(540,516,'Continue to payment →',20,'#081820',700)
save('quick-pay',s)
# Subscriptions
s=base('Subscriptions','Ongoing work. Clearly organized.')
s+=pill(35,145,'Packages',134)+text(202,169,'Transactions',17,MUTED)
s+=rect(30,203,375,368)+rect(49,224,337,106,'#0B2939','#164661')+text(73,265,'MONTHLY CARE',16,BLUE,700)+text(72,307,'Service package',28,WHITE,700)
s+=text(55,380,'$120',43,WHITE,700)+text(166,379,'/ month',19,MUTED)+text(55,430,'Included services',17,BLUE,700)+text(55,465,'Monthly maintenance visit',19)+text(55,497,'Priority scheduling',19)+text(55,541,'Terms agreed per customer',15,MUTED)
s+=rect(427,203,443,368)+text(452,243,'CUSTOMER ENROLLMENT',14,MUTED,700)
for y,name,status,col in [(293,'Morgan residence','Active',GREEN),(390,'Chen residence','Pending setup',BLUE),(487,'Rivera residence','Needs review','#F3BB77')]:
 s+=text(452,y,name,20,WHITE,700)+text(452,y+30,status,16,col)
 if y<487:s+=line(y+56,450,845)
save('subscriptions',s)
# Invoice
s=base('Invoicing','Invoice #1042')+pill(680,91,'Payment requested',185)
s+=rect(30,149,398,422)+text(55,190,'Morgan residence',25,WHITE,700)+text(55,221,'Monthly maintenance & supplies',17,MUTED)+line(248,55,402)
s+=text(55,286,'Monthly maintenance',18)+text(314,286,'$240.00',19)+text(55,333,'Replacement supplies',18)+text(327,333,'$45.00',19)+line(363,55,402)
s+=text(55,407,'Invoice total',20,WHITE,700)+text(304,407,'$285.00',23,WHITE,700)+text(55,473,'Due September 30, 2026',17,MUTED)+text(55,530,'Details stay beside the payment.',17,BLUE)
s+=rect(450,149,420,422)+text(475,190,'Card checkout',25,WHITE,700)+text(475,223,'Payment method: Card',16,BLUE)
s+=rect(475,249,370,51,'#1B1E24')+text(493,281,'Card number',17,MUTED)
s+=rect(475,315,177,51,'#1B1E24')+text(493,347,'MM / YY',17,MUTED)+rect(668,315,177,51,'#1B1E24')+text(687,347,'CVV',17,MUTED)
s+=rect(475,390,19,19,'#1B1E24',r=4)+text(505,406,'Save my card for future payments',16,MUTED)
s+=rect(475,445,370,63,'#1598D8','#1598D8')+text(569,485,'Pay $285.00 →',21,'#081820',700)+text(475,547,'Sample only · No payment is processed',14,MUTED)
save('invoice',s)
# QSR
s=base('Quick Service','Ready for the next order.')
s+=rect(30,149,500,422)+text(55,187,'MENU CATEGORIES',14,MUTED,700)
for x,label,symbol in [(52,'Coffee','☕'),(289,'Kitchen','⋮')]:
 s+=rect(x,212,217,120,'#0B2939','#164661')+text(x+84,265,symbol,34,BLUE)+text(x+72,307,label,20,WHITE,700)
s+=text(55,380,'Iced latte',21,WHITE,700)+text(422,380,'$5.50',20)+line(408,55,504)+text(55,450,'Breakfast sandwich',21,WHITE,700)+text(422,450,'$8.00',20)
s+=rect(55,491,450,49,'#1B1E24')+text(171,522,'+ Add custom item',19,BLUE,700)
s+=rect(552,149,318,422)+text(577,189,'ORDER #108',14,BLUE,700)+text(577,244,'1 × Iced latte',19)+text(783,244,'$5.50',18)+text(577,292,'1 × Sandwich',19)+text(783,292,'$8.00',18)+text(577,340,'1 × Custom item',19)+text(783,340,'$2.00',18)+line(380,577,845)
s+=text(577,422,'Subtotal',18,MUTED)+text(756,422,'$15.50',23,WHITE,700)+text(577,454,'Taxes omitted in this example',13,MUTED)+rect(577,481,268,60,'#1598D8','#1598D8')+text(660,519,'Checkout →',20,'#081820',700)
save('qsr',s)
