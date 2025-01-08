#!/bin/bash
# -*- coding: utf-8, tab-width: 2 -*-


function bpgen () {
  local RANGES=(
    0021..002F
    003A..0040
    005B..0060
    007B..007E
    00A1..00AC
    00AE..00BF
    00F7
    00F8
    2016..2027
    2030..205E
    )
  ( echo '<!DOCTYPE html><html><head><meta charset="UTF-8"><body><p>'
    echo -n start.
    local FROM= UPTO= DEC= HEX=
    for FROM in "${RANGES[@]}"; do
      let UPTO=0x"${FROM#*..}"
      let FROM=0x"${FROM%..*}"
      DEC="$FROM"
      while [ "$DEC" -le "$UPTO" ]; do
        printf -- '&#x%04X;' "$DEC"
        [ $(( DEC % 8 )) == 0 ] && echo -n .
        (( DEC += 1 ))
      done
    done
    echo .end
    echo '</p></body></html>'
  ) | tee -- basic_punctuation.html
}










bpgen "$@"; exit $?
