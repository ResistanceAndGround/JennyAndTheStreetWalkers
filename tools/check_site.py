from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
from collections import Counter
import re
root=Path(__file__).resolve().parents[1]
void={'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}
class Page(HTMLParser):
 def __init__(self): super().__init__();self.refs=[];self.ids=[];self.stack=[];self.errors=[]
 def handle_starttag(self,t,a):
  d=dict(a)
  if 'id' in d:self.ids.append(d['id'])
  self.refs.extend(d[k] for k in ['href','src'] if k in d)
  if t=='img' and 'alt' not in d:self.errors.append('missing alt')
  if t not in void:self.stack.append(t)
 def handle_startendtag(self,t,a):
  self.handle_starttag(t,a)
  if t not in void:self.handle_endtag(t)
 def handle_endtag(self,t):
  if not self.stack or self.stack[-1]!=t:self.errors.append('tag mismatch '+t)
  else:self.stack.pop()
pages={}
for f in root.glob('*.html'):
 p=Page();s=f.read_text(encoding='utf-8');p.feed(s);pages[f.name]=p
 assert not p.errors and not p.stack,(f,p.errors,p.stack)
 assert len(p.ids)==len(set(p.ids)),(f,'duplicate ID')
 assert not re.search(r'Resistance|resistground|RGWebSite|mike-wilson',s,re.I),(f,'unrelated branding')
 assert len(re.findall(r'<h1\b',s))==1,(f,'h1 count')
 assert '<meta property="og:image" content="https://' in s,(f,'absolute social image')
for name,p in pages.items():
 for link in p.refs:
  u=urlsplit(link)
  if u.scheme:continue
  current=root
  if u.path:
   for part in Path(unquote(u.path)).parts:
    assert part in [x.name for x in current.iterdir()],(name,link,'missing or incorrect case')
    current=current/part
  if u.fragment:
   target=pages.get(current.name if u.path else name)
   assert target and unquote(u.fragment) in target.ids,(name,link,'missing anchor')
 print(name+': PASS — nesting, IDs, local assets/anchors, filename case, alt attributes, metadata')
print('Static audit passed for '+str(len(pages))+' pages.')
