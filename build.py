from PIL import Image
K=[('kop',5,'ul. Kopińska 12','Remont klatki schodowej','Szachownica na posadzkach, odnowiona balustrada z drewnianą poręczą, gładkie ściany.'),
   ('m45',4,'ul. Marszałkowska 45/49','Remont klatek schodowych','Remont klatek schodowych, a także piwnicy tego budynku.'),
   ('m136',4,'ul. Marszałkowska 136','Remont klatki schodowej','Okładziny ścian, schody i hol wejściowy.'),
   ('pro',4,'ul. Próżna 10','Remont klatki schodowej','Klatka schodowa kamienicy w Śródmieściu.'),
   ('war',3,'ul. Waryńskiego 26','Remont klatki schodowej','Posadzki, ściany i balustrada z drewnianą poręczą.'),
   ('pul',3,'ul. Puławska 1A','Remont części wspólnych','Hol przy windach i korytarze wykończone kamieniem.'),
   ('ele',3,'ul. Elektoralna 28','Remont klatki schodowej','Schody, ściany i balustrady klatki.')]
out=[]
for k,n,adr,t,o in K:
    sl=[]
    for i in range(1,n+1):
        w,h=Image.open(f'img/{k}{i}-800.webp').size
        sl.append(f'<button data-lb="img/{k}{i}-1400.webp"><img src="img/{k}{i}-800.webp" srcset="img/{k}{i}-480.webp 480w, img/{k}{i}-800.webp 800w" sizes="(max-width:759px) 86vw, (max-width:1279px) 46vw, (max-width:1899px) 30vw, 23vw" width="{w}" height="{h}" loading="lazy" decoding="async" alt="{t}, {adr} - zdjęcie {i}"></button>')
    out.append(f'''   <article class="karta" data-grupa>
    <div class="fot"><div class="tor" data-tor>{''.join(sl)}</div><button class="st l" aria-label="Poprzednie zdjęcie" disabled><svg aria-hidden="true"><use href="#i-lew"/></svg></button><button class="st r" aria-label="Następne zdjęcie"><svg aria-hidden="true"><use href="#i-str"/></svg></button><span class="licz">1/{n}</span></div>
    <div class="opis"><span class="adres">{adr}</span><h3>{t}</h3><p>{o}</p></div>
   </article>''')
s=open('src.html',encoding='utf-8').read()
s=s.replace('{{KARTY}}','\n'.join(out))
s=s.replace('{{BADGE_STYLE}}',open('badge_style.part',encoding='utf-8').read().replace('<style>','').replace('</style>','').strip())
s=s.replace('{{BADGE_LINK}}',open('badge_link.part',encoding='utf-8').read().strip())
open('index.html','w',encoding='utf-8').write(s)
