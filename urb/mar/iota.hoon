/+  goon
|_  iot=iota:goon
++  grad  %noun
++  grab
  |%
  ++  json  
    |=  jon=^json
    ^-  iota:goon
    ?<  ?=(~ jon)
    ?>  ?=(%s -.jon)
    ?~  i=(slay p.jon)
      !!
    ?>  ?=(%$ -.u.i)
    p.u.i
    
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
