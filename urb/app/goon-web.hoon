/+  default-agent, goon
|%
++  enjs
  =,  enjs:format
  |=  [=bowl:gall =goad:goon]
  |^  ^-  json
  %-  pairs
  :~  iota/s/(scod:goon p.goad)
      attr/a/(turn q.goad attr)
      child/a/(turn r.goad |=(g=goad:goon (enjs bowl g)))
  ==
  ::
  ++  attr
    |=  a=attr:goon
    %+  frond  -.a
    ?-  -.a
      %lede    s/p.a
      %info    s/p.a
      %value   (page-to-json p.a)
      %edit    ~
      %add     ~
      %act     (act-enjs p.a)
      %click   ~
      %hint    (hint-enjs p.a)
    ==
  ::
  ++  hint-enjs
    |=  p=(list hint:goon)
    :-  %a 
    %+  turn  p
    |=  h=hint:goon
    (frond -.h ~)
  ::
  ++  act-enjs
    |=  p=(list act:goon)
    :-  %a
    %+  turn  p
    |=  a=act:goon
    %-  pairs
    :~  term/s/p.a
        info/s/info.q.a
        lede/s/lede.q.a
    ==
  ++  page-to-json
    |=  =page
    ^-  json
    =/   hed  /cc/(scot %p our.bowl)/[q.byk.bowl]/(scot %da now.bowl)
    =+  .^(fst=tube:clay (welp hed /noun/[p.page]))
    =+  .^(snd=tube:clay (welp hed /[p.page]/json))
    %-  pairs
    :~  mark/s/p.page
        data/!<(json (snd (fst !>(q.page))))
    == 
  --
--
|_  =bowl:gall
+*  this  .
    def   ~(. (default-agent this %|) bowl)
++  on-init  `this
++  on-save  !>(~)
++  on-load  on-load:def
++  on-poke  on-poke:def
++  on-watch  on-watch:def
++  on-peek   
  |=  =path
  ^-  (unit (unit cage))
  ?+    path  (on-peek:def path)
      [%x %goon ~]
    =+  .^(=goad:goon /gx/(scot %p our.bowl)/pals/(scot %da now.bowl)/goon/noun)
    ``json+!>((enjs bowl goad))
  ==
++  on-agent  on-agent:def
++  on-arvo   on-arvo:def
++  on-leave  on-leave:def
++  on-fail   on-fail:def
--
