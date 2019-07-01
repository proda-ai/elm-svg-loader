module Child exposing (icon, view)

import Html exposing (Html, div, text)
import InlineSvg exposing (inline)


icon  =
    inline
        { code = "./svg/code.svg"
        } |> .icon


view : Html ()
view =
    div [] [ icon .code [] ]
