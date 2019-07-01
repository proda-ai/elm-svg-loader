module Main exposing (icon, main, view)

import Child
import Browser
import Html exposing (Html, div, text)
import InlineSvg exposing (inline)
import Svg.Attributes


icon =
    inline
        { eye = "./svg/eye.svg"
        , github = "./svg/mark-github.svg"
        , code = "./svg/code.svg"
        } |> .icon


view : () -> Html ()
view () =
    div
        []
        [ icon .eye [ Svg.Attributes.class "icon" ]
        , icon .github [ Svg.Attributes.class "icon" ]
        , icon .code [ Svg.Attributes.class "icon" ]
        , Child.view
        , text  "Hello World"
        ]


main : Program () () ()
main =
    Browser.sandbox
        { init = ()
        , update = \() () -> ()
        , view = view
        }
