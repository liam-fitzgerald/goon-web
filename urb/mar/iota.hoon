/+  goon
|_  iot=iota:goon
++  grad  %noun
++  grab
  |%
  ++  json  
    |=  jon=^json
    ^-  iota:goon
    ?<  ?=(~ jon)
    ?>  ?=(%o -.jon)
    =/  aur  (~(got by p.jon) %aura)
    =/  dat  (~(got by p.jon) %data)
    ?<  ?=(~ aur)
    ?<  ?=(~ dat)
    ?>  ?=(%s -.aur)
    ?>  ?=(%s -.dat)
    ?:  =(%t p.aur)
      [p.aur p.dat]
    ?:  =(%f p.aur)
      [p.aur =('&' p.dat)]
    [p.aur (slav p.aur p.dat)]
  ++  noun  iota:goon
  --
++  grow
  |%
  ++  noun  iot
  ++  json
    %-  pairs:enjs:format
    ?@  iot
      :~  aura/s/%tas
          data/s/iot
      ==
    :~  aura/s/p.iot
        data/s/(scod:goon iot)
    ==
  --
--
