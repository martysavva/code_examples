// Function
import * as selectors from './selectors';

const mockStore = {
  CONSTS: {
    values: {
      filterKeys: {
        autoFilled: 'autoFilled',
        manuallyCurated: 'manuallyCurated',
        all: null
      },
      recommendations: {
        service: {
          wiw: 'wiw'
        }
      }
    }
  },
  app: {
    currentConcertina: '1'
  },
  wiwSubjects: {
    "1": {
      "variantId": "1",
      "photo": "http://cdn.yoox.biz/49/49336277qw_10_f.jpg",
      "designerName": "Valentino",
      "colour": "GREEN",
      "filterColour": "TORQUOISE",
      "name": "Clerkenwell Cotton Shirt",
      "price": "£680",
      "classification": {
        "classification1": "",
        "classification2": "Coats and Jackest",
        "classification3": "Drawstring trousers"
      },
      "season": "Continuity",
      "wearItWith": {
        "OUTFIT 864": {
          "outfitId": "OUTFIT 864",
          "photo": "http://iris/000099991.jpg",
          "slots": {
            "18076": {
              "autoFilled": true,
              "variantId": "18076",
              "timeLastSaved": "2019-04-02T06:00:00",
              "photo": "http://cdn.yoox.biz/49/49336277qw_10_f.jpg",
              "stock": 61,
              "price": "£910",
              "designerName": "On the Island by Marios Schwab",
              "colour": "GREEN",
              "filterColour": "GREEN",
              "classification": {
                "classification1": "",
                "classification2": "Coats and Jackest",
                "classification3": "Drawstring trousers"
              },
              "visibility": [
                {
                  "name": "UKME",
                  "visible": false
                },
                {
                  "name": "AM"
                },
                {
                  "name": "INTL",
                  "visible": false,
                  "stock": -2
                }
              ],
              "replacementVariants": {
                "changes": [
                  [
                    "120561",
                    "166749",
                    "97277",
                    "103479",
                    "129064",
                    "157024",
                    "126963",
                    "75838",
                    "94898",
                    "172962",
                    "142892",
                    "143810",
                    "133280",
                    "169756"
                  ]
                ],
                "changesPosition": 0,
                "saved": [
                  "120561",
                  "166749",
                  "97277",
                  "103479",
                  "129064",
                  "157024",
                  "126963",
                  "75838",
                  "94898",
                  "172962",
                  "142892",
                  "143810",
                  "133280",
                  "169756"
                ]
              }
            },
            "28142": {
              "autoFilled": true,
              "variantId": "28142",
              "timeLastSaved": "2018-03-20T06:00:00",
              "photo": "http://cdn.yoox.biz/49/49310212ij_10_f.jpg",
              "stock": 96,
              "price": "£948",
              "designerName": "",
              "colour": "PURPLE",
              "filterColour": "",
              "classification": {
                "classification1": "Accessories",
                "classification2": "Polos",
                "classification3": ""
              },
              "visibility": [
                {
                  "name": "UKME"
                },
                {
                  "name": "AM",
                  "visible": false
                },
                {
                  "name": "INTL",
                  "visible": true
                }
              ],
              "replacementVariants": {
                "changes": [
                  [
                    "126334",
                    "22204",
                    "97025",
                    "171934"
                  ]
                ],
                "changesPosition": 0,
                "saved": [
                  "126334",
                  "22204",
                  "97025",
                  "171934"
                ]
              }
            },
            "76492": {
              "autoFilled": true,
              "variantId": "76492",
              "timeLastSaved": "2019-04-02T06:00:00",
              "photo": "http://cdn.yoox.biz/54/54131538cu_10_f.jpg",
              "stock": 97,
              "price": "£241",
              "designerName": "IRO",
              "colour": "YELLOW",
              "filterColour": "BLACK",
              "classification": {
                "classification1": "Designers",
                "classification2": "",
                "classification3": ""
              },
              "visibility": [
                {
                  "name": "UKME",
                  "visible": true,
                  "stock": -2
                },
                {
                  "name": "AM"
                },
                {
                  "name": "INTL"
                }
              ],
              "replacementVariants": {
                "changes": [
                  [
                    "155177",
                    "135247",
                    "176064",
                    "139101",
                    "41195",
                    "165645"
                  ]
                ],
                "changesPosition": 0,
                "saved": [
                  "155177",
                  "135247",
                  "176064",
                  "139101",
                  "41195",
                  "165645"
                ]
              }
            },
            "78435": {
              "autoFilled": true,
              "variantId": "78435",
              "timeLastSaved": "2019-03-23T06:00:00",
              "photo": "http://cdn.yoox.biz/41/41759274pl_10_f.jpg",
              "stock": 59,
              "price": "",
              "designerName": "",
              "colour": "YELLOW",
              "filterColour": "TORQUOISE",
              "classification": {
                "classification1": "",
                "classification2": "",
                "classification3": "Short sleeved shirts"
              },
              "visibility": [
                {
                  "name": "UKME",
                  "visible": true
                },
                {
                  "name": "AM",
                  "visible": false,
                  "stock": -1
                },
                {
                  "name": "INTL"
                }
              ],
              "replacementVariants": {
                "changes": [
                  [
                    "77756",
                    "124702",
                    "119038",
                    "100014",
                    "167036",
                    "135083"
                  ]
                ],
                "changesPosition": 0,
                "saved": [
                  "77756",
                  "124702",
                  "119038",
                  "100014",
                  "167036",
                  "135083"
                ]
              }
            },
            "84447": {
              "variantId": "84447",
              "error": "Invalid Variant"
            },
            "changes": [
              "84447",
              "18076",
              "78435",
              "28142",
              "76492"
            ],
            "saved": [
              "84447",
              "18076",
              "78435",
              "28142",
              "76492"
            ]
          }
        },
        "OUTFIT 448": {
          "outfitId": "OUTFIT 448",
          "photo": "https://cache.mrporter.com/images/products/1010973/1010973_mrp_ou_l.jpg",
          "slots": {
            "13904": {
              "autoFilled": false,
              "variantId": "13904",
              "timeLastSaved": "2018-10-26T06:00:00",
              "photo": "",
              "stock": 94,
              "price": "£1047",
              "designerName": "Chloé",
              "colour": "GREEN",
              "filterColour": "WHITE",
              "classification": {
                "classification1": "Clothing",
                "classification2": "Formal Shirts",
                "classification3": ""
              },
              "visibility": [
                {
                  "name": "UKME"
                },
                {
                  "name": "AM",
                  "stock": -2
                },
                {
                  "name": "INTL",
                  "visible": true,
                  "stock": -2
                }
              ],
              "replacementVariants": {
                "changes": [
                  [
                    "158282",
                    "125332",
                    "144903",
                    "155178",
                    "103401",
                    "139769",
                    "84977",
                    "186708",
                    "23858",
                    "172509",
                    "139425",
                    "137414",
                    "178297"
                  ],
                  ['1','2','3']
                ],
                "changesPosition": 1,
                "saved": [
                  "158282",
                  "125332",
                  "144903",
                  "155178",
                  "103401",
                  "139769",
                  "84977",
                  "186708",
                  "23858",
                  "172509",
                  "139425",
                  "137414",
                  "178297"
                ]
              }
            },
            "17100": {
              "autoFilled": false,
              "variantId": "17100",
              "timeLastSaved": "2019-10-02T06:00:00",
              "photo": "http://cdn.yoox.biz/34/34793746uj_10_f.jpg",
              "stock": 35,
              "price": "£971",
              "designerName": "R13",
              "colour": "BLUE",
              "filterColour": "WHITE",
              "classification": {
                "classification1": "Accessories",
                "classification2": "",
                "classification3": "Drawstring trousers"
              },
              "visibility": [
                {
                  "name": "UKME",
                  "stock": -1
                },
                {
                  "name": "AM",
                  "visible": true,
                  "stock": 0
                },
                {
                  "name": "INTL",
                  "stock": 1
                }
              ],
              "replacementVariants": {
                "changes": [
                  [
                    "172232",
                    "112227",
                    "145383",
                    "135639",
                    "136406",
                    "121497",
                    "114223",
                    "159595"
                  ]
                ],
                "changesPosition": 0,
                "saved": [
                  "172232",
                  "112227",
                  "145383",
                  "135639",
                  "136406",
                  "121497",
                  "114223",
                  "159595"
                ]
              }
            },
            "75529": {
              "autoFilled": false,
              "variantId": "75529",
              "timeLastSaved": "",
              "photo": "",
              "stock": 74,
              "price": "£836",
              "designerName": "3XI",
              "colour": "",
              "filterColour": "BLUE",
              "classification": {
                "classification1": "",
                "classification2": "",
                "classification3": ""
              },
              "visibility": [
                {
                  "name": "UKME"
                },
                {
                  "name": "AM"
                },
                {
                  "name": "INTL",
                  "visible": true
                }
              ],
              "replacementVariants": {
                "changes": [
                  [
                    "33087",
                    "142630",
                    "98628",
                    "106257"
                  ]
                ],
                "changesPosition": 0,
                "saved": [
                  "33087",
                  "142630",
                  "98628",
                  "106257"
                ]
              }
            },
            "81914": {
              "autoFilled": false,
              "variantId": "81914",
              "timeLastSaved": "2019-10-02T06:00:00",
              "photo": "",
              "stock": 80,
              "price": "£356",
              "designerName": "Stella Mccartney",
              "colour": "BLACK",
              "filterColour": "",
              "classification": {
                "classification1": "Clothing",
                "classification2": "",
                "classification3": "Drawstring trousers"
              },
              "visibility": [
                {
                  "name": "UKME"
                },
                {
                  "name": "AM",
                  "visible": true
                },
                {
                  "name": "INTL",
                  "stock": 1
                }
              ],
              "replacementVariants": {
                "changes": [
                  [
                    "120003",
                    "58309",
                    "91940",
                    "99712",
                    "181727",
                    "143389",
                    "26651",
                    "144231",
                    "27469",
                    "115139"
                  ]
                ],
                "changesPosition": 0,
                "saved": [
                  "120003",
                  "58309",
                  "91940",
                  "99712",
                  "181727",
                  "143389",
                  "26651",
                  "144231",
                  "27469",
                  "115139"
                ]
              }
            },
            "87102": {
              "variantId": "87102",
              "error": "Invalid Variant"
            },
            "changes": [
              "17100",
              "13904",
              "81914",
              "87102",
              "75529"
            ],
            "saved": [
              "17100",
              "13904",
              "81914",
              "87102",
              "75529"
            ]
          }
        },
        "selectedChange": "OUTFIT 448",
        "changes": [
          "OUTFIT 448",
          "OUTFIT 864"
        ],
        "saved": [
          "OUTFIT 448",
          "OUTFIT 864"
        ]
      }
    },
    'changes': ['1']
  },
  variants: {
    "22204": {
      "variantId": "22204"
    },
    "23858": {
      "variantId": "23858"
    },
    "26651": {
      "variantId": "26651"
    },
    "27469": {
      "variantId": "27469"
    },
    "33087": {
      "variantId": "33087"
    },
    "41195": {
      "variantId": "41195"
    },
    "58309": {
      "variantId": "58309"
    },
    "75838": {
      "variantId": "75838"
    },
    "77756": {
      "variantId": "77756"
    },
    "84977": {
      "variantId": "84977"
    },
    "85941": {
      "variantId": "85941"
    },
    "91940": {
      "variantId": "91940",
      "photo": "http://cdn.yoox.biz/11/11345404xi_10_f.jpg",
      "stock": 13,
      "designerName": "Chloé",
      "price": "£847",
      "colour": "TORQUOISE",
      "filterColour": "WHITE",
      "classification": {
        "classification1": "",
        "classification2": "Trousers",
        "classification3": "Raincoats and trench coats"
      },
      "visibility": [
        {
          "name": "UKME",
          "stock": 0
        },
        {
          "name": "AM",
          "visible": false
        },
        {
          "name": "INTL",
          "visible": true,
          "stock": -1
        }
      ]
    },
    "94898": {
      "variantId": "94898",
      "photo": "",
      "stock": 98,
      "designerName": "Chloé",
      "price": "",
      "colour": "YELLOW",
      "filterColour": "",
      "classification": {
        "classification1": "Designers",
        "classification2": "Casual Shirts",
        "classification3": "Raincoats and trench coats"
      },
      "visibility": [
        {
          "name": "UKME"
        },
        {
          "name": "AM",
          "stock": 0
        },
        {
          "name": "INTL",
          "visible": true
        }
      ]
    },
    "97025": {
      "variantId": "97025",
      "photo": "",
      "stock": 5,
      "designerName": "Lano - Lips Hands All Over",
      "price": "£599",
      "colour": "PURPLE",
      "filterColour": "PURPLE",
      "classification": {
        "classification1": "Designers",
        "classification2": "",
        "classification3": "Lightweight and waterproof jackets"
      },
      "visibility": [
        {
          "name": "UKME"
        },
        {
          "name": "AM",
          "stock": -2
        },
        {
          "name": "INTL",
          "visible": true
        }
      ]
    },
    "97277": {
      "variantId": "97277",
      "photo": "http://cdn.yoox.biz/42/42631112ae_10_f.jpg",
      "stock": 40,
      "designerName": "Proenza Schouler",
      "price": "£999",
      "colour": "",
      "filterColour": "WHITE",
      "classification": {
        "classification1": "Accessories",
        "classification2": "Coats and Jackest",
        "classification3": "Short sleeved shirts"
      },
      "visibility": [
        {
          "name": "UKME",
          "visible": true
        },
        {
          "name": "AM"
        },
        {
          "name": "INTL",
          "stock": 1
        }
      ]
    },
    "98628": {
      "variantId": "98628",
      "photo": "http://cdn.yoox.biz/49/49322654bu_10_f.jpg",
      "stock": 89,
      "designerName": "Marni",
      "price": "£511",
      "colour": "",
      "filterColour": "PURPLE",
      "classification": {
        "classification1": "",
        "classification2": "Coats and Jackest",
        "classification3": ""
      },
      "visibility": [
        {
          "name": "UKME",
          "visible": true
        },
        {
          "name": "AM"
        },
        {
          "name": "INTL",
          "stock": -1
        }
      ]
    },
    "99712": {
      "variantId": "99712",
      "photo": "http://cdn.yoox.biz/54/54150703wh_10_f.jpg",
      "stock": 59,
      "designerName": "",
      "price": "£240",
      "colour": "BLACK",
      "filterColour": "TORQUOISE",
      "classification": {
        "classification1": "",
        "classification2": "",
        "classification3": "Cashmere coats and jackets"
      },
      "visibility": [
        {
          "name": "UKME",
          "stock": -2
        },
        {
          "name": "AM",
          "visible": false
        },
        {
          "name": "INTL",
          "stock": 1
        }
      ]
    },
    "100014": {
      "variantId": "100014",
      "photo": "http://cdn.yoox.biz/49/49317240wd_10_f.jpg",
      "stock": 54,
      "designerName": "Stella Mccartney",
      "price": "£308",
      "colour": "GREEN",
      "filterColour": "",
      "classification": {
        "classification1": "",
        "classification2": "Casual Shirts",
        "classification3": "Drawstring trousers"
      },
      "visibility": [
        {
          "name": "UKME",
          "stock": 1
        },
        {
          "name": "AM"
        },
        {
          "name": "INTL",
          "stock": -2
        }
      ]
    },
    "103401": {
      "variantId": "103401",
      "photo": "",
      "stock": 92,
      "designerName": "Nausheen Shah X Monica Sordo",
      "price": "£171",
      "colour": "TORQUOISE",
      "filterColour": "YELLOW",
      "classification": {
        "classification1": "",
        "classification2": "Casual Shirts",
        "classification3": "Raincoats and trench coats"
      },
      "visibility": [
        {
          "name": "UKME",
          "visible": false
        },
        {
          "name": "AM",
          "visible": false,
          "stock": 1
        },
        {
          "name": "INTL",
          "visible": false
        }
      ]
    },
    "103479": {
      "variantId": "103479",
      "photo": "http://cdn.yoox.biz/35/35346511ub_10_f.jpg",
      "stock": 97,
      "designerName": "Philosophy Di Lorenzo Serafini",
      "price": "£472",
      "colour": "BLUE",
      "filterColour": "",
      "classification": {
        "classification1": "",
        "classification2": "",
        "classification3": "Single breasted blazers"
      },
      "visibility": [
        {
          "name": "UKME",
          "visible": true,
          "stock": 1
        },
        {
          "name": "AM"
        },
        {
          "name": "INTL"
        }
      ]
    },
    "106257": {
      "variantId": "106257",
      "photo": "",
      "stock": 47,
      "designerName": "Lano - Lips Hands All Over",
      "price": "",
      "colour": "",
      "filterColour": "BLUE",
      "classification": {
        "classification1": "",
        "classification2": "Blazers",
        "classification3": ""
      },
      "visibility": [
        {
          "name": "UKME",
          "visible": false,
          "stock": -1
        },
        {
          "name": "AM"
        },
        {
          "name": "INTL",
          "visible": true,
          "stock": 0
        }
      ]
    },
    "112227": {
      "variantId": "112227",
      "photo": "http://cdn.yoox.biz/54/54151476xs_10_f.jpg",
      "stock": 35,
      "designerName": "Philosophy Di Lorenzo Serafini",
      "price": "£198",
      "colour": "TORQUOISE",
      "filterColour": "BLACK",
      "classification": {
        "classification1": "Accessories",
        "classification2": "Trousers",
        "classification3": ""
      },
      "visibility": [
        {
          "name": "UKME",
          "stock": -2
        },
        {
          "name": "AM",
          "stock": 1
        },
        {
          "name": "INTL"
        }
      ]
    },
    "114223": {
      "variantId": "114223",
      "photo": "http://cdn.yoox.biz/49/49289328rn_10_f.jpg",
      "stock": 13,
      "designerName": "Marni",
      "price": "£914",
      "colour": "BLACK",
      "filterColour": "",
      "classification": {
        "classification1": "Accessories",
        "classification2": "Formal Shirts",
        "classification3": ""
      },
      "visibility": [
        {
          "name": "UKME",
          "stock": 0
        },
        {
          "name": "AM",
          "stock": -1
        },
        {
          "name": "INTL",
          "stock": 1
        }
      ]
    },
    "115139": {
      "variantId": "115139",
      "photo": "http://cdn.yoox.biz/45/45384525oe_10_f.jpg",
      "stock": 78,
      "designerName": "Proenza Schouler",
      "price": "",
      "colour": "BLUE",
      "filterColour": "",
      "classification": {
        "classification1": "Designers",
        "classification2": "Polos",
        "classification3": "Cashmere coats and jackets"
      },
      "visibility": [
        {
          "name": "UKME"
        },
        {
          "name": "AM",
          "visible": true,
          "stock": -2
        },
        {
          "name": "INTL",
          "stock": -2
        }
      ]
    },
    "119038": {
      "variantId": "119038",
      "photo": "",
      "stock": 1,
      "designerName": "IRO",
      "price": "£682",
      "colour": "GREEN",
      "filterColour": "BLACK",
      "classification": {
        "classification1": "Accessories",
        "classification2": "",
        "classification3": "Cashmere coats and jackets"
      },
      "visibility": [
        {
          "name": "UKME",
          "visible": false
        },
        {
          "name": "AM",
          "visible": false,
          "stock": 0
        },
        {
          "name": "INTL",
          "stock": 0
        }
      ]
    },
    "120003": {
      "variantId": "120003",
      "photo": "",
      "stock": 54,
      "designerName": "",
      "price": "£739",
      "colour": "",
      "filterColour": "",
      "classification": {
        "classification1": "Designers",
        "classification2": "Casual Shirts",
        "classification3": "Cashmere coats and jackets"
      },
      "visibility": [
        {
          "name": "UKME"
        },
        {
          "name": "AM",
          "visible": true
        },
        {
          "name": "INTL",
          "visible": true
        }
      ]
    },
    "120561": {
      "variantId": "120561",
      "photo": "http://cdn.yoox.biz/45/45383725vg_10_f.jpg",
      "stock": 54,
      "designerName": "",
      "price": "£777",
      "colour": "YELLOW",
      "filterColour": "WHITE",
      "classification": {
        "classification1": "",
        "classification2": "Casual Shirts",
        "classification3": ""
      },
      "visibility": [
        {
          "name": "UKME"
        },
        {
          "name": "AM",
          "stock": -2
        },
        {
          "name": "INTL",
          "visible": true,
          "stock": -2
        }
      ]
    },
    "121497": {
      "variantId": "121497",
      "photo": "http://cdn.yoox.biz/11/11357263cs_10_f.jpg",
      "stock": 68,
      "designerName": "Stella Mccartney",
      "price": "£489",
      "colour": "YELLOW",
      "filterColour": "",
      "classification": {
        "classification1": "",
        "classification2": "",
        "classification3": "Single breasted blazers"
      },
      "visibility": [
        {
          "name": "UKME",
          "stock": -1
        },
        {
          "name": "AM",
          "stock": -2
        },
        {
          "name": "INTL",
          "stock": 0
        }
      ]
    },
    "122506": {
      "variantId": "122506",
      "photo": "http://cdn.yoox.biz/41/41766815ag_10_f.jpg",
      "stock": 45,
      "designerName": "IRO",
      "price": "£948",
      "colour": "BLUE",
      "filterColour": "BLUE",
      "classification": {
        "classification1": "Accessories",
        "classification2": "Polos",
        "classification3": ""
      },
      "visibility": [
        {
          "name": "UKME",
          "visible": true,
          "stock": -2
        },
        {
          "name": "AM"
        },
        {
          "name": "INTL"
        }
      ]
    },
    "124702": {
      "variantId": "124702",
      "photo": "http://cdn.yoox.biz/11/11357263cs_10_f.jpg",
      "stock": 42,
      "designerName": "IRO",
      "price": "£64",
      "colour": "",
      "filterColour": "",
      "classification": {
        "classification1": "Designers",
        "classification2": "Formal Shirts",
        "classification3": "Raincoats and trench coats"
      },
      "visibility": [
        {
          "name": "UKME",
          "visible": true
        },
        {
          "name": "AM"
        },
        {
          "name": "INTL",
          "stock": -1
        }
      ]
    },
    "125332": {
      "variantId": "125332",
      "photo": "http://cdn.yoox.biz/49/49305545wj_10_f.jpg",
      "stock": 93,
      "designerName": "Proenza Schouler",
      "price": "£1035",
      "colour": "WHITE",
      "filterColour": "",
      "classification": {
        "classification1": "Clothing",
        "classification2": "Casual Shirts",
        "classification3": "Short sleeved shirts"
      },
      "visibility": [
        {
          "name": "UKME"
        },
        {
          "name": "AM",
          "stock": 1
        },
        {
          "name": "INTL"
        }
      ]
    },
    "126334": {
      "variantId": "126334",
      "photo": "",
      "stock": 78,
      "designerName": "Philosophy Di Lorenzo Serafini",
      "price": "£570",
      "colour": "",
      "filterColour": "YELLOW",
      "classification": {
        "classification1": "Accessories",
        "classification2": "Polos",
        "classification3": ""
      },
      "visibility": [
        {
          "name": "UKME"
        },
        {
          "name": "AM",
          "visible": true,
          "stock": -1
        },
        {
          "name": "INTL",
          "visible": true
        }
      ]
    },
    "126963": {
      "variantId": "126963",
      "photo": "http://cdn.yoox.biz/42/42631112ae_10_f.jpg",
      "stock": 5,
      "designerName": "Diane Von Furstenberg",
      "price": "£714",
      "colour": "BLUE",
      "filterColour": "TORQUOISE",
      "classification": {
        "classification1": "Accessories",
        "classification2": "Blazers",
        "classification3": "Raincoats and trench coats"
      },
      "visibility": [
        {
          "name": "UKME",
          "stock": 1
        },
        {
          "name": "AM"
        },
        {
          "name": "INTL"
        }
      ]
    },
    "129064": {
      "variantId": "129064",
      "photo": "http://cdn.yoox.biz/11/11388796ow_10_f.jpg",
      "stock": 17,
      "designerName": "Marni",
      "price": "£169",
      "colour": "WHITE",
      "filterColour": "PURPLE",
      "classification": {
        "classification1": "Designers",
        "classification2": "Formal Shirts",
        "classification3": ""
      },
      "visibility": [
        {
          "name": "UKME"
        },
        {
          "name": "AM",
          "visible": false,
          "stock": -1
        },
        {
          "name": "INTL",
          "visible": false
        }
      ]
    },
    "133280": {
      "variantId": "133280",
      "photo": "",
      "stock": 92,
      "designerName": "Stella Mccartney",
      "price": "",
      "colour": "",
      "filterColour": "PURPLE",
      "classification": {
        "classification1": "Designers",
        "classification2": "Trousers",
        "classification3": "Single breasted blazers"
      },
      "visibility": [
        {
          "name": "UKME"
        },
        {
          "name": "AM",
          "visible": false,
          "stock": 1
        },
        {
          "name": "INTL"
        }
      ]
    },
    "133977": {
      "variantId": "133977",
      "photo": "http://cdn.yoox.biz/49/49302109ua_10_f.jpg",
      "stock": 48,
      "designerName": "3XI",
      "price": "£156",
      "colour": "BLUE",
      "filterColour": "",
      "classification": {
        "classification1": "Designers",
        "classification2": "Coats and Jackest",
        "classification3": "Short sleeved shirts"
      },
      "visibility": [
        {
          "name": "UKME",
          "visible": false,
          "stock": 1
        },
        {
          "name": "AM"
        },
        {
          "name": "INTL",
          "stock": -1
        }
      ]
    },
    "135083": {
      "variantId": "135083",
      "photo": "http://cdn.yoox.biz/49/49313335ua_10_f.jpg",
      "stock": 81,
      "designerName": "Chloé",
      "price": "£516",
      "colour": "BLACK",
      "filterColour": "TORQUOISE",
      "classification": {
        "classification1": "Designers",
        "classification2": "",
        "classification3": ""
      },
      "visibility": [
        {
          "name": "UKME",
          "visible": false,
          "stock": 0
        },
        {
          "name": "AM",
          "visible": true,
          "stock": 0
        },
        {
          "name": "INTL"
        }
      ]
    },
    "135247": {
      "variantId": "135247",
      "photo": "http://cdn.yoox.biz/49/49338779lo_10_f.jpg",
      "stock": 73,
      "designerName": "Marni",
      "price": "£567",
      "colour": "GREEN",
      "filterColour": "TORQUOISE",
      "classification": {
        "classification1": "Accessories",
        "classification2": "Formal Shirts",
        "classification3": "Drawstring trousers"
      },
      "visibility": [
        {
          "name": "UKME"
        },
        {
          "name": "AM",
          "visible": true,
          "stock": 1
        },
        {
          "name": "INTL",
          "visible": true
        }
      ]
    },
    "135639": {
      "variantId": "135639",
      "photo": "http://cdn.yoox.biz/54/54150703wh_10_f.jpg",
      "stock": 59,
      "designerName": "Chloé",
      "price": "£864",
      "colour": "TORQUOISE",
      "filterColour": "BLUE",
      "classification": {
        "classification1": "Accessories",
        "classification2": "Casual Shirts",
        "classification3": ""
      },
      "visibility": [
        {
          "name": "UKME"
        },
        {
          "name": "AM"
        },
        {
          "name": "INTL",
          "stock": 0
        }
      ]
    },
    "136406": {
      "variantId": "136406",
      "photo": "http://cdn.yoox.biz/45/45371972bi_10_f.jpg",
      "stock": 41,
      "designerName": "",
      "price": "£833",
      "colour": "PURPLE",
      "filterColour": "",
      "classification": {
        "classification1": "Accessories",
        "classification2": "Casual Shirts",
        "classification3": ""
      },
      "visibility": [
        {
          "name": "UKME",
          "visible": true
        },
        {
          "name": "AM",
          "visible": false,
          "stock": 0
        },
        {
          "name": "INTL"
        }
      ]
    },
    "137414": {
      "variantId": "137414",
      "photo": "",
      "stock": 22,
      "designerName": "Preen by Thornton Bregazzi",
      "price": "£227",
      "colour": "WHITE",
      "filterColour": "WHITE",
      "classification": {
        "classification1": "",
        "classification2": "Trousers",
        "classification3": "Drawstring trousers"
      },
      "visibility": [
        {
          "name": "UKME",
          "visible": true
        },
        {
          "name": "AM",
          "visible": true
        },
        {
          "name": "INTL",
          "visible": true
        }
      ]
    },
    "139101": {
      "variantId": "139101",
      "photo": "http://cdn.yoox.biz/11/11382557rd_10_f.jpg",
      "stock": 64,
      "designerName": "Marni",
      "price": "",
      "colour": "WHITE",
      "filterColour": "BLUE",
      "classification": {
        "classification1": "Accessories",
        "classification2": "",
        "classification3": "Drawstring trousers"
      },
      "visibility": [
        {
          "name": "UKME",
          "visible": false,
          "stock": 0
        },
        {
          "name": "AM",
          "visible": true,
          "stock": 0
        },
        {
          "name": "INTL",
          "stock": 1
        }
      ]
    },
    "139425": {
      "variantId": "139425",
      "photo": "http://cdn.yoox.biz/49/49347671qf_10_f.jpg",
      "stock": 12,
      "designerName": "Lano - Lips Hands All Over",
      "price": "£374",
      "colour": "PURPLE",
      "filterColour": "",
      "classification": {
        "classification1": "",
        "classification2": "Blazers",
        "classification3": ""
      },
      "visibility": [
        {
          "name": "UKME",
          "stock": -2
        },
        {
          "name": "AM"
        },
        {
          "name": "INTL",
          "stock": -2
        }
      ]
    },
    "139769": {
      "variantId": "139769",
      "photo": "http://cdn.yoox.biz/35/35350203nc_10_f.jpg",
      "stock": 96,
      "designerName": "",
      "price": "£184",
      "colour": "TORQUOISE",
      "filterColour": "PURPLE",
      "classification": {
        "classification1": "Clothing",
        "classification2": "",
        "classification3": "Drawstring trousers"
      },
      "visibility": [
        {
          "name": "UKME",
          "stock": -1
        },
        {
          "name": "AM"
        },
        {
          "name": "INTL",
          "visible": true
        }
      ]
    },
    "142630": {
      "variantId": "142630",
      "photo": "",
      "stock": 89,
      "designerName": "Lano - Lips Hands All Over",
      "price": "",
      "colour": "GREEN",
      "filterColour": "GREEN",
      "classification": {
        "classification1": "",
        "classification2": "Blazers",
        "classification3": "Drawstring trousers"
      },
      "visibility": [
        {
          "name": "UKME"
        },
        {
          "name": "AM"
        },
        {
          "name": "INTL"
        }
      ]
    },
    "142892": {
      "variantId": "142892",
      "photo": "",
      "stock": 97,
      "designerName": "Valentino",
      "price": "",
      "colour": "BLUE",
      "filterColour": "GREEN",
      "classification": {
        "classification1": "Clothing",
        "classification2": "Formal Shirts",
        "classification3": "Lightweight and waterproof jackets"
      },
      "visibility": [
        {
          "name": "UKME"
        },
        {
          "name": "AM",
          "visible": false
        },
        {
          "name": "INTL",
          "visible": true
        }
      ]
    },
    "142896": {
      "variantId": "142896",
      "photo": "http://cdn.yoox.biz/41/41770625ql_10_f.jpg",
      "stock": 80,
      "designerName": "",
      "price": "",
      "colour": "",
      "filterColour": "TORQUOISE",
      "classification": {
        "classification1": "",
        "classification2": "",
        "classification3": ""
      },
      "visibility": [
        {
          "name": "UKME",
          "visible": false
        },
        {
          "name": "AM",
          "stock": -2
        },
        {
          "name": "INTL"
        }
      ]
    },
    "143389": {
      "variantId": "143389",
      "photo": "http://cdn.yoox.biz/13/13098740ep_10_f.jpg",
      "stock": 38,
      "designerName": "IRO",
      "price": "£273",
      "colour": "",
      "filterColour": "WHITE",
      "classification": {
        "classification1": "",
        "classification2": "Coats and Jackest",
        "classification3": ""
      },
      "visibility": [
        {
          "name": "UKME",
          "visible": false,
          "stock": 1
        },
        {
          "name": "AM",
          "stock": -2
        },
        {
          "name": "INTL"
        }
      ]
    },
    "143810": {
      "variantId": "143810",
      "photo": "http://cdn.yoox.biz/49/49322654bu_10_f.jpg",
      "stock": 71,
      "designerName": "Preen by Thornton Bregazzi",
      "price": "£814",
      "colour": "WHITE",
      "filterColour": "GREEN",
      "classification": {
        "classification1": "Accessories",
        "classification2": "Polos",
        "classification3": "Single breasted blazers"
      },
      "visibility": [
        {
          "name": "UKME",
          "visible": true
        },
        {
          "name": "AM",
          "visible": false,
          "stock": 0
        },
        {
          "name": "INTL",
          "visible": false
        }
      ]
    },
    "144231": {
      "variantId": "144231",
      "photo": "http://cdn.yoox.biz/49/49331974ae_10_f.jpg",
      "stock": 16,
      "designerName": "Chloé",
      "price": "£239",
      "colour": "",
      "filterColour": "BLACK",
      "classification": {
        "classification1": "Designers",
        "classification2": "",
        "classification3": "Single breasted blazers"
      },
      "visibility": [
        {
          "name": "UKME"
        },
        {
          "name": "AM",
          "stock": -1
        },
        {
          "name": "INTL",
          "visible": true,
          "stock": -2
        }
      ]
    },
    "144903": {
      "variantId": "144903",
      "photo": "",
      "stock": 64,
      "designerName": "Diane Von Furstenberg",
      "price": "£524",
      "colour": "BLACK",
      "filterColour": "PURPLE",
      "classification": {
        "classification1": "Designers",
        "classification2": "",
        "classification3": "Drawstring trousers"
      },
      "visibility": [
        {
          "name": "UKME",
          "visible": true,
          "stock": -2
        },
        {
          "name": "AM"
        },
        {
          "name": "INTL"
        }
      ]
    },
    "145383": {
      "variantId": "145383",
      "photo": "http://cdn.yoox.biz/39/39813892bj_10_f.jpg",
      "stock": 77,
      "designerName": "Diane Von Furstenberg",
      "price": "",
      "colour": "TORQUOISE",
      "filterColour": "YELLOW",
      "classification": {
        "classification1": "Clothing",
        "classification2": "",
        "classification3": ""
      },
      "visibility": [
        {
          "name": "UKME",
          "visible": false
        },
        {
          "name": "AM",
          "stock": -1
        },
        {
          "name": "INTL",
          "stock": 1
        }
      ]
    },
    "149148": {
      "variantId": "149148",
      "photo": "http://cdn.yoox.biz/49/49337069ma_10_f.jpg",
      "stock": 19,
      "designerName": "Saint Laurent",
      "price": "£868",
      "colour": "WHITE",
      "filterColour": "TORQUOISE",
      "classification": {
        "classification1": "",
        "classification2": "Casual Shirts",
        "classification3": "Cashmere coats and jackets"
      },
      "visibility": [
        {
          "name": "UKME",
          "visible": true
        },
        {
          "name": "AM",
          "visible": true,
          "stock": 0
        },
        {
          "name": "INTL",
          "visible": false
        }
      ]
    },
    "155177": {
      "variantId": "155177",
      "photo": "http://cdn.yoox.biz/41/41772502qk_10_f.jpg",
      "stock": 81,
      "designerName": "Preen by Thornton Bregazzi",
      "price": "£578",
      "colour": "WHITE",
      "filterColour": "PURPLE",
      "classification": {
        "classification1": "",
        "classification2": "Trousers",
        "classification3": ""
      },
      "visibility": [
        {
          "name": "UKME"
        },
        {
          "name": "AM",
          "visible": false,
          "stock": 0
        },
        {
          "name": "INTL",
          "visible": true
        }
      ]
    },
    "155178": {
      "variantId": "155178",
      "photo": "http://cdn.yoox.biz/42/42647527rr_10_f.jpg",
      "stock": 88,
      "designerName": "",
      "price": "",
      "colour": "BLACK",
      "filterColour": "GREEN",
      "classification": {
        "classification1": "Clothing",
        "classification2": "Blazers",
        "classification3": ""
      },
      "visibility": [
        {
          "name": "UKME",
          "visible": false
        },
        {
          "name": "AM",
          "visible": true
        },
        {
          "name": "INTL",
          "visible": false,
          "stock": -2
        }
      ]
    },
    "157024": {
      "variantId": "157024",
      "photo": "",
      "stock": 98,
      "designerName": "Saint Laurent",
      "price": "",
      "colour": "",
      "filterColour": "YELLOW",
      "classification": {
        "classification1": "",
        "classification2": "",
        "classification3": ""
      },
      "visibility": [
        {
          "name": "UKME",
          "visible": true
        },
        {
          "name": "AM",
          "visible": true
        },
        {
          "name": "INTL",
          "visible": true,
          "stock": -1
        }
      ]
    },
    "158282": {
      "variantId": "158282",
      "photo": "http://cdn.yoox.biz/49/49317411xf_10_f.jpg",
      "stock": 80,
      "designerName": "",
      "price": "",
      "colour": "PURPLE",
      "filterColour": "",
      "classification": {
        "classification1": "Accessories",
        "classification2": "",
        "classification3": "Cashmere coats and jackets"
      },
      "visibility": [
        {
          "name": "UKME",
          "visible": true
        },
        {
          "name": "AM"
        },
        {
          "name": "INTL",
          "stock": 0
        }
      ]
    },
    "159595": {
      "variantId": "159595",
      "photo": "http://cdn.yoox.biz/11/11357263cs_10_f.jpg",
      "stock": 24,
      "designerName": "On the Island by Marios Schwab",
      "price": "£630",
      "colour": "PURPLE",
      "filterColour": "BLACK",
      "classification": {
        "classification1": "",
        "classification2": "",
        "classification3": "Lightweight and waterproof jackets"
      },
      "visibility": [
        {
          "name": "UKME"
        },
        {
          "name": "AM"
        },
        {
          "name": "INTL",
          "visible": false,
          "stock": 0
        }
      ]
    },
    "165645": {
      "variantId": "165645",
      "photo": "http://cdn.yoox.biz/11/11388889ka_10_f.jpg",
      "stock": 33,
      "designerName": "Marni",
      "price": "£655",
      "colour": "WHITE",
      "filterColour": "TORQUOISE",
      "classification": {
        "classification1": "Designers",
        "classification2": "Blazers",
        "classification3": ""
      },
      "visibility": [
        {
          "name": "UKME",
          "stock": -2
        },
        {
          "name": "AM"
        },
        {
          "name": "INTL",
          "visible": false,
          "stock": 1
        }
      ]
    },
    "166749": {
      "variantId": "166749",
      "photo": "http://cdn.yoox.biz/41/41770625ql_10_f.jpg",
      "stock": 79,
      "designerName": "Chloé",
      "price": "£199",
      "colour": "BLUE",
      "filterColour": "BLUE",
      "classification": {
        "classification1": "Designers",
        "classification2": "Trousers",
        "classification3": "Short sleeved shirts"
      },
      "visibility": [
        {
          "name": "UKME",
          "visible": false
        },
        {
          "name": "AM",
          "visible": true,
          "stock": -1
        },
        {
          "name": "INTL"
        }
      ]
    },
    "167036": {
      "variantId": "167036",
      "photo": "",
      "stock": 78,
      "designerName": "R13",
      "price": "£399",
      "colour": "YELLOW",
      "filterColour": "",
      "classification": {
        "classification1": "Clothing",
        "classification2": "",
        "classification3": "Cashmere coats and jackets"
      },
      "visibility": [
        {
          "name": "UKME",
          "visible": true
        },
        {
          "name": "AM",
          "visible": true,
          "stock": -2
        },
        {
          "name": "INTL",
          "stock": 0
        }
      ]
    },
    "169756": {
      "variantId": "169756",
      "photo": "http://cdn.yoox.biz/49/49313335ua_10_f.jpg",
      "stock": 25,
      "designerName": "3XI",
      "price": "£415",
      "colour": "BLUE",
      "filterColour": "BLUE",
      "classification": {
        "classification1": "",
        "classification2": "Trousers",
        "classification3": "Lightweight and waterproof jackets"
      },
      "visibility": [
        {
          "name": "UKME"
        },
        {
          "name": "AM",
          "stock": -2
        },
        {
          "name": "INTL",
          "visible": true,
          "stock": -1
        }
      ]
    },
    "171934": {
      "variantId": "171934",
      "photo": "http://cdn.yoox.biz/45/45383861xi_10_f.jpg",
      "stock": 88,
      "designerName": "Chloé",
      "price": "",
      "colour": "",
      "filterColour": "",
      "classification": {
        "classification1": "",
        "classification2": "Trousers",
        "classification3": ""
      },
      "visibility": [
        {
          "name": "UKME",
          "stock": 1
        },
        {
          "name": "AM"
        },
        {
          "name": "INTL",
          "visible": true,
          "stock": 1
        }
      ]
    },
    "172232": {
      "variantId": "172232",
      "photo": "",
      "stock": 74,
      "designerName": "Chloé",
      "price": "",
      "colour": "TORQUOISE",
      "filterColour": "BLACK",
      "classification": {
        "classification1": "Designers",
        "classification2": "",
        "classification3": ""
      },
      "visibility": [
        {
          "name": "UKME"
        },
        {
          "name": "AM",
          "visible": false
        },
        {
          "name": "INTL"
        }
      ]
    },
    "172509": {
      "variantId": "172509",
      "photo": "http://cdn.yoox.biz/49/49295241fs_10_r.jpg",
      "stock": 55,
      "designerName": "Valentino",
      "price": "",
      "colour": "WHITE",
      "filterColour": "BLUE",
      "classification": {
        "classification1": "",
        "classification2": "Formal Shirts",
        "classification3": ""
      },
      "visibility": [
        {
          "name": "UKME"
        },
        {
          "name": "AM"
        },
        {
          "name": "INTL",
          "visible": true
        }
      ]
    },
    "172657": {
      "variantId": "172657",
      "photo": "",
      "stock": 2,
      "designerName": "Valentino",
      "price": "£637",
      "colour": "BLUE",
      "filterColour": "",
      "classification": {
        "classification1": "",
        "classification2": "Coats and Jackest",
        "classification3": ""
      },
      "visibility": [
        {
          "name": "UKME"
        },
        {
          "name": "AM"
        },
        {
          "name": "INTL",
          "visible": true,
          "stock": -1
        }
      ]
    },
    "172962": {
      "variantId": "172962",
      "photo": "http://cdn.yoox.biz/49/49318216if_10_f.jpg",
      "stock": 89,
      "designerName": "Marni",
      "price": "£83",
      "colour": "BLACK",
      "filterColour": "GREEN",
      "classification": {
        "classification1": "Accessories",
        "classification2": "Blazers",
        "classification3": "Raincoats and trench coats"
      },
      "visibility": [
        {
          "name": "UKME"
        },
        {
          "name": "AM",
          "visible": false
        },
        {
          "name": "INTL",
          "visible": true
        }
      ]
    },
    "176064": {
      "variantId": "176064",
      "photo": "http://cdn.yoox.biz/45/45382477sb_10_f.jpg",
      "stock": 12,
      "designerName": "Preen by Thornton Bregazzi",
      "price": "£462",
      "colour": "",
      "filterColour": "",
      "classification": {
        "classification1": "",
        "classification2": "Polos",
        "classification3": "Lightweight and waterproof jackets"
      },
      "visibility": [
        {
          "name": "UKME",
          "visible": true
        },
        {
          "name": "AM"
        },
        {
          "name": "INTL",
          "stock": 0
        }
      ]
    },
    "178297": {
      "variantId": "178297",
      "photo": "http://cdn.yoox.biz/49/49331684mk_10_f.jpg",
      "stock": 86,
      "designerName": "",
      "price": "£369",
      "colour": "PURPLE",
      "filterColour": "BLACK",
      "classification": {
        "classification1": "Accessories",
        "classification2": "Casual Shirts",
        "classification3": ""
      },
      "visibility": [
        {
          "name": "UKME",
          "visible": true
        },
        {
          "name": "AM",
          "visible": true,
          "stock": 0
        },
        {
          "name": "INTL",
          "visible": true,
          "stock": -2
        }
      ]
    },
    "181727": {
      "variantId": "181727",
      "photo": "http://cdn.yoox.biz/49/49322740wt_10_f.jpg",
      "stock": 94,
      "designerName": "Lano - Lips Hands All Over",
      "price": "£621",
      "colour": "PURPLE",
      "filterColour": "PURPLE",
      "classification": {
        "classification1": "",
        "classification2": "Coats and Jackest",
        "classification3": "Short sleeved shirts"
      },
      "visibility": [
        {
          "name": "UKME",
          "visible": false,
          "stock": -2
        },
        {
          "name": "AM"
        },
        {
          "name": "INTL"
        }
      ]
    },
    "186708": {
      "variantId": "186708",
      "photo": "http://cdn.yoox.biz/45/45382594mg_10_f.jpg",
      "stock": 74,
      "designerName": "R13",
      "price": "",
      "colour": "",
      "filterColour": "TORQUOISE",
      "classification": {
        "classification1": "Clothing",
        "classification2": "Polos",
        "classification3": "Cashmere coats and jackets"
      },
      "visibility": [
        {
          "name": "UKME",
          "stock": -2
        },
        {
          "name": "AM",
          "visible": true,
          "stock": -2
        },
        {
          "name": "INTL"
        }
      ]
    }
  },
  variantsAttributes: {
    wiw: {
      "1": {
        "OUTFIT 864": {
          "18076": {
            "75838": {
              "error": "Invalid Variant"
            },
            "94898": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "97277": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "103479": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": true
            },
            "120561": {
              "manuallyAdded": true,
              "indicateAsManuallyAdded": true
            },
            "126963": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "129064": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "133280": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "142892": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "143810": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": true
            },
            "157024": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": true
            },
            "166749": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "169756": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "172962": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            }
          },
          "28142": {
            "22204": {
              "error": "Invalid Variant"
            },
            "97025": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "126334": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": true
            },
            "171934": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            }
          },
          "76492": {
            "41195": {
              "error": "Invalid Variant"
            },
            "135247": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "139101": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "155177": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "165645": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": true
            },
            "176064": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": true
            }
          },
          "78435": {
            "77756": {
              "error": "Invalid Variant"
            },
            "100014": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "119038": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "124702": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "135083": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "167036": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            }
          }
        },
        "OUTFIT 448": {
          "13904": {
            "23858": {
              "error": "Invalid Variant"
            },
            "84977": {
              "error": "Invalid Variant"
            },
            "103401": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "125332": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "137414": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "139425": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "139769": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "144903": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "155178": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": true
            },
            "158282": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "172509": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "178297": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "186708": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            }
          },
          "17100": {
            "112227": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "114223": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "121497": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "135639": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "136406": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": true
            },
            "145383": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "159595": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": true
            },
            "172232": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            }
          },
          "75529": {
            "33087": {
              "error": "Invalid Variant"
            },
            "98628": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": true
            },
            "106257": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "142630": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            }
          },
          "81914": {
            "26651": {
              "error": "Invalid Variant"
            },
            "27469": {
              "error": "Invalid Variant"
            },
            "58309": {
              "error": "Invalid Variant"
            },
            "91940": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "99712": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "115139": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "120003": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "143389": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": true
            },
            "144231": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "181727": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": true
            }
          },
          "87102": {
            "85941": {
              "error": "Invalid Variant"
            },
            "122506": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "133977": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "142896": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "149148": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            },
            "172657": {
              "manuallyAdded": false,
              "indicateAsManuallyAdded": false
            }
          }
        }
      }
    }
  }

};

describe('wiwSubjects selectors', () => {

  it("selectSubjectIds: should return an array of subjectIds", () => {
    // setup
    const testFunc = selectors.selectSubjectIds;
    const state = mockStore;
    const input = '1';
    const result =  ['1'];

    // test
    const value = testFunc(state, input);
    expect(value).toEqual(result);
  });

  it("selectSubject: should return subject object", () => {
    // setup
    const testFunc = selectors.selectSubject;
    const state = mockStore;
    const input = '1';
    const result = {
      "variantId": "1",
      "photo": "http://cdn.yoox.biz/49/49336277qw_10_f.jpg",
      "designerName": "Valentino",
      "colour": "GREEN",
      "filterColour": "TORQUOISE",
      "name": "Clerkenwell Cotton Shirt",
      "price": "£680",
      "classification": {
        "classification1": "",
        "classification2": "Coats and Jackest",
        "classification3": "Drawstring trousers"
      },
      "season": "Continuity",
      "wearItWith": {
        "OUTFIT 864": {
          "outfitId": "OUTFIT 864",
          "photo": "http://iris/000099991.jpg",
          "slots": {
            "18076": {
              "autoFilled": true,
              "variantId": "18076",
              "timeLastSaved": "2019-04-02T06:00:00",
              "photo": "http://cdn.yoox.biz/49/49336277qw_10_f.jpg",
              "stock": 61,
              "price": "£910",
              "designerName": "On the Island by Marios Schwab",
              "colour": "GREEN",
              "filterColour": "GREEN",
              "classification": {
                "classification1": "",
                "classification2": "Coats and Jackest",
                "classification3": "Drawstring trousers"
              },
              "visibility": [
                {
                  "name": "UKME",
                  "visible": false
                },
                {
                  "name": "AM"
                },
                {
                  "name": "INTL",
                  "visible": false,
                  "stock": -2
                }
              ],
              "replacementVariants": {
                "changes": [
                  [
                    "120561",
                    "166749",
                    "97277",
                    "103479",
                    "129064",
                    "157024",
                    "126963",
                    "75838",
                    "94898",
                    "172962",
                    "142892",
                    "143810",
                    "133280",
                    "169756"
                  ]
                ],
                "changesPosition": 0,
                "saved": [
                  "120561",
                  "166749",
                  "97277",
                  "103479",
                  "129064",
                  "157024",
                  "126963",
                  "75838",
                  "94898",
                  "172962",
                  "142892",
                  "143810",
                  "133280",
                  "169756"
                ]
              }
            },
            "28142": {
              "autoFilled": true,
              "variantId": "28142",
              "timeLastSaved": "2018-03-20T06:00:00",
              "photo": "http://cdn.yoox.biz/49/49310212ij_10_f.jpg",
              "stock": 96,
              "price": "£948",
              "designerName": "",
              "colour": "PURPLE",
              "filterColour": "",
              "classification": {
                "classification1": "Accessories",
                "classification2": "Polos",
                "classification3": ""
              },
              "visibility": [
                {
                  "name": "UKME"
                },
                {
                  "name": "AM",
                  "visible": false
                },
                {
                  "name": "INTL",
                  "visible": true
                }
              ],
              "replacementVariants": {
                "changes": [
                  [
                    "126334",
                    "22204",
                    "97025",
                    "171934"
                  ]
                ],
                "changesPosition": 0,
                "saved": [
                  "126334",
                  "22204",
                  "97025",
                  "171934"
                ]
              }
            },
            "76492": {
              "autoFilled": true,
              "variantId": "76492",
              "timeLastSaved": "2019-04-02T06:00:00",
              "photo": "http://cdn.yoox.biz/54/54131538cu_10_f.jpg",
              "stock": 97,
              "price": "£241",
              "designerName": "IRO",
              "colour": "YELLOW",
              "filterColour": "BLACK",
              "classification": {
                "classification1": "Designers",
                "classification2": "",
                "classification3": ""
              },
              "visibility": [
                {
                  "name": "UKME",
                  "visible": true,
                  "stock": -2
                },
                {
                  "name": "AM"
                },
                {
                  "name": "INTL"
                }
              ],
              "replacementVariants": {
                "changes": [
                  [
                    "155177",
                    "135247",
                    "176064",
                    "139101",
                    "41195",
                    "165645"
                  ]
                ],
                "changesPosition": 0,
                "saved": [
                  "155177",
                  "135247",
                  "176064",
                  "139101",
                  "41195",
                  "165645"
                ]
              }
            },
            "78435": {
              "autoFilled": true,
              "variantId": "78435",
              "timeLastSaved": "2019-03-23T06:00:00",
              "photo": "http://cdn.yoox.biz/41/41759274pl_10_f.jpg",
              "stock": 59,
              "price": "",
              "designerName": "",
              "colour": "YELLOW",
              "filterColour": "TORQUOISE",
              "classification": {
                "classification1": "",
                "classification2": "",
                "classification3": "Short sleeved shirts"
              },
              "visibility": [
                {
                  "name": "UKME",
                  "visible": true
                },
                {
                  "name": "AM",
                  "visible": false,
                  "stock": -1
                },
                {
                  "name": "INTL"
                }
              ],
              "replacementVariants": {
                "changes": [
                  [
                    "77756",
                    "124702",
                    "119038",
                    "100014",
                    "167036",
                    "135083"
                  ]
                ],
                "changesPosition": 0,
                "saved": [
                  "77756",
                  "124702",
                  "119038",
                  "100014",
                  "167036",
                  "135083"
                ]
              }
            },
            "84447": {
              "variantId": "84447",
              "error": "Invalid Variant"
            },
            "changes": [
              "84447",
              "18076",
              "78435",
              "28142",
              "76492"
            ],
            "saved": [
              "84447",
              "18076",
              "78435",
              "28142",
              "76492"
            ]
          }
        },
        "OUTFIT 448": {
          "outfitId": "OUTFIT 448",
          "photo": "https://cache.mrporter.com/images/products/1010973/1010973_mrp_ou_l.jpg",
          "slots": {
            "13904": {
              "autoFilled": false,
              "variantId": "13904",
              "timeLastSaved": "2018-10-26T06:00:00",
              "photo": "",
              "stock": 94,
              "price": "£1047",
              "designerName": "Chloé",
              "colour": "GREEN",
              "filterColour": "WHITE",
              "classification": {
                "classification1": "Clothing",
                "classification2": "Formal Shirts",
                "classification3": ""
              },
              "visibility": [
                {
                  "name": "UKME"
                },
                {
                  "name": "AM",
                  "stock": -2
                },
                {
                  "name": "INTL",
                  "visible": true,
                  "stock": -2
                }
              ],
              "replacementVariants": {
                "changes": [
                  [
                    "158282",
                    "125332",
                    "144903",
                    "155178",
                    "103401",
                    "139769",
                    "84977",
                    "186708",
                    "23858",
                    "172509",
                    "139425",
                    "137414",
                    "178297"
                  ],
                  ['1','2','3']
                ],
                "changesPosition": 1,
                "saved": [
                  "158282",
                  "125332",
                  "144903",
                  "155178",
                  "103401",
                  "139769",
                  "84977",
                  "186708",
                  "23858",
                  "172509",
                  "139425",
                  "137414",
                  "178297"
                ]
              }
            },
            "17100": {
              "autoFilled": false,
              "variantId": "17100",
              "timeLastSaved": "2019-10-02T06:00:00",
              "photo": "http://cdn.yoox.biz/34/34793746uj_10_f.jpg",
              "stock": 35,
              "price": "£971",
              "designerName": "R13",
              "colour": "BLUE",
              "filterColour": "WHITE",
              "classification": {
                "classification1": "Accessories",
                "classification2": "",
                "classification3": "Drawstring trousers"
              },
              "visibility": [
                {
                  "name": "UKME",
                  "stock": -1
                },
                {
                  "name": "AM",
                  "visible": true,
                  "stock": 0
                },
                {
                  "name": "INTL",
                  "stock": 1
                }
              ],
              "replacementVariants": {
                "changes": [
                  [
                    "172232",
                    "112227",
                    "145383",
                    "135639",
                    "136406",
                    "121497",
                    "114223",
                    "159595"
                  ]
                ],
                "changesPosition": 0,
                "saved": [
                  "172232",
                  "112227",
                  "145383",
                  "135639",
                  "136406",
                  "121497",
                  "114223",
                  "159595"
                ]
              }
            },
            "75529": {
              "autoFilled": false,
              "variantId": "75529",
              "timeLastSaved": "",
              "photo": "",
              "stock": 74,
              "price": "£836",
              "designerName": "3XI",
              "colour": "",
              "filterColour": "BLUE",
              "classification": {
                "classification1": "",
                "classification2": "",
                "classification3": ""
              },
              "visibility": [
                {
                  "name": "UKME"
                },
                {
                  "name": "AM"
                },
                {
                  "name": "INTL",
                  "visible": true
                }
              ],
              "replacementVariants": {
                "changes": [
                  [
                    "33087",
                    "142630",
                    "98628",
                    "106257"
                  ]
                ],
                "changesPosition": 0,
                "saved": [
                  "33087",
                  "142630",
                  "98628",
                  "106257"
                ]
              }
            },
            "81914": {
              "autoFilled": false,
              "variantId": "81914",
              "timeLastSaved": "2019-10-02T06:00:00",
              "photo": "",
              "stock": 80,
              "price": "£356",
              "designerName": "Stella Mccartney",
              "colour": "BLACK",
              "filterColour": "",
              "classification": {
                "classification1": "Clothing",
                "classification2": "",
                "classification3": "Drawstring trousers"
              },
              "visibility": [
                {
                  "name": "UKME"
                },
                {
                  "name": "AM",
                  "visible": true
                },
                {
                  "name": "INTL",
                  "stock": 1
                }
              ],
              "replacementVariants": {
                "changes": [
                  [
                    "120003",
                    "58309",
                    "91940",
                    "99712",
                    "181727",
                    "143389",
                    "26651",
                    "144231",
                    "27469",
                    "115139"
                  ]
                ],
                "changesPosition": 0,
                "saved": [
                  "120003",
                  "58309",
                  "91940",
                  "99712",
                  "181727",
                  "143389",
                  "26651",
                  "144231",
                  "27469",
                  "115139"
                ]
              }
            },
            "87102": {
              "variantId": "87102",
              "error": "Invalid Variant"
            },
            "changes": [
              "17100",
              "13904",
              "81914",
              "87102",
              "75529"
            ],
            "saved": [
              "17100",
              "13904",
              "81914",
              "87102",
              "75529"
            ]
          }
        },
        "selectedChange": "OUTFIT 448",
        "changes": [
          "OUTFIT 448",
          "OUTFIT 864"
        ],
        "saved": [
          "OUTFIT 448",
          "OUTFIT 864"
        ]
      }
    };

    // test
    const value = testFunc(state, input);
    expect(value).toEqual(result);
  });

  it("selectCurrentConcertina: should return currentConcertina value", () => {
    // setup
    const testFunc = selectors.selectCurrentConcertina;
    const state = mockStore;
    const result =  '1';

    // test
    const value = testFunc(state);
    expect(value).toEqual(result);
  });

  it("selectCurrentOutfit: should return current selected outfit", () => {
    // setup
    const testFunc = selectors.selectCurrentOutfit;
    const state = mockStore;
    const input = '1';
    const result =  'OUTFIT 448';

    // test
    const value = testFunc(state, input);
    expect(value).toEqual(result);
  });

  it("selectIsActive: should return true if subjectId matches current concertina", () => {
    // setup
    const testFunc = selectors.selectIsActive;
    const state = mockStore;
    const input = '1';
    const result =  true;

    // test
    const value = testFunc(state, input);
    expect(value).toEqual(result);
  });

  it("selectIsActive: should return false if subjectId does not match current concertina", () => {
    // setup
    const testFunc = selectors.selectIsActive;
    const state = mockStore;
    const input = '12';
    const result =  false;

    // test
    const value = testFunc(state, input);
    expect(value).toEqual(result);
  });

  it("selectOutfitIds: should return an unfiltered array", () => {
    // setup
    const testFunc = selectors.selectOutfitIds;
    const state = {
      ...mockStore,
      filter: {
        wiw: {
          value: null
        }
      },
      editMode: {
        wiw:[]
      }
    };
    const input = '1';
    const result = ["OUTFIT 448", "OUTFIT 864"];

    // test
    const value = testFunc(state, input);
    expect(value).toEqual(result);
  });

  it("selectOutfitIds: should return any outfitIds that contain autoFilled slots", () => {
    // setup
    const testFunc = selectors.selectOutfitIds;
    const state = {
      ...mockStore,
      filter: {
        wiw: {
          key: 'autoFilled',
          value: 'Auto Filled'
        }
      },
      editMode: {
        wiw:[]
      }
    };
    const input = '1';
    const result = ["OUTFIT 864"];

    // test
    const value = testFunc(state, input);
    expect(value).toEqual(result);
  });

  it("selectOutfitIds: should return any outfitIds that contain manuallyCurated slots", () => {
    // setup
    const testFunc = selectors.selectOutfitIds;
    const state = {
      ...mockStore,
      filter: {
        wiw: {
          key: 'manuallyCurated',
          value: 'Manually Curated'
        }
      },
      editMode: {
        wiw:[]
      }
    };
    const input = '1';
    const result = ["OUTFIT 448"];

    // test
    const value = testFunc(state, input);
    expect(value).toEqual(result);
  });

  it("selectSlotIds: should return an unfiltered array", () => {
    // setup
    const testFunc = selectors.selectSlotIds;
    const state = {
      ...mockStore,
      filter: {
        wiw: {
          value: null
        }
      },
      editMode: {
        wiw:[]
      }
    };
    const input = '1';
    const input2 = 'OUTFIT 864';
    const result = ["84447", "18076", "78435", "28142", "76492"];

    // test
    const value = testFunc(state, input, input2);
    expect(value).toEqual(result);
  });

  it("selectSlotIds: should return an empty autoFilled array", () => {
    // setup
    const testFunc = selectors.selectSlotIds;
    const state = {
      ...mockStore,
      filter: {
        wiw: {
          key: 'autoFilled',
          value: 'Auto Filled'
        }
      },
      editMode: {
        wiw:[]
      }
    };
    const input = '1';
    const input2 = 'OUTFIT 448';
    const result = [];

    // test
    const value = testFunc(state, input, input2);
    expect(value).toEqual(result);
  });

  it("selectSlotIds: should return an autoFilled array", () => {
    // setup
    const testFunc = selectors.selectSlotIds;
    const state = {
      ...mockStore,
      filter: {
        wiw: {
          key: 'autoFilled',
          value: 'Auto Filled'
        }
      },
      editMode: {
        wiw:[]
      }
    };
    const input = '1';
    const input2 = 'OUTFIT 864';
    const result = ["18076", "78435", "28142", "76492"];

    // test
    const value = testFunc(state, input, input2);
    expect(value).toEqual(result);
  });

  it("selectSlotIds: should return an empty manuallyCurated array", () => {
    // setup
    const testFunc = selectors.selectSlotIds;
    const state = {
      ...mockStore,
      filter: {
        wiw: {
          key: 'manuallyCurated',
          value: 'Manually Curated'
        }
      },
      editMode: {
        wiw:[]
      }
    };
    const input = '1';
    const input2 = 'OUTFIT 864';
    const result = [];

    // test
    const value = testFunc(state, input, input2);
    expect(value).toEqual(result);
  });

  it("selectSlotIds: should return a manuallyCurated array", () => {
    // setup
    const testFunc = selectors.selectSlotIds;
    const state = {
      ...mockStore,
      filter: {
        wiw: {
          key: 'manuallyCurated',
          value: 'Manually Curated'
        }
      },
      editMode: {
        wiw:[]
      }
    };
    const input = '1';
    const input2 = 'OUTFIT 448';
    const result = ["17100", "13904", "81914", "75529"];

    // test
    const value = testFunc(state, input, input2);
    expect(value).toEqual(result);
  });

  it("selectSlotIds: should return a array of currently selected outfit", () => {
    // setup
    const testFunc = selectors.selectSlotIds;
    const state = {
      ...mockStore,
      filter: {
        wiw: {
          key: null,
          value: null
        }
      },
      editMode: {
        wiw:[]
      }
    };
    const input = '1';
    const result = ["17100", "13904", "81914", "87102", "75529"];

    // test
    const value = testFunc(state, input);
    expect(value).toEqual(result);
  });

  xit("selectSlotIds: should remove outfits with an error when filter is autoFiled", () => {
    // setup
    const testFunc = selectors.selectSlotIds;
    const state = {
      ...mockStore,
      filter: {
        wiw: {
          key: 'autoFilled',
          value: 'Auto Filled'
        }
      },
      editMode: {
        wiw:[]
      }
    };
    const input = '1';
    const result = ["11346", "93085", "67908", "87794"];

    // test
    const value = testFunc(state, input);
    expect(value).toEqual(result);
  });

  it("selectSlot: should return selected slot when outfit is specified", () => {
    // setup
    const testFunc = selectors.selectSlot;
    const state = mockStore;
    const input = '1';
    const input2 = '18076';
    const input3 = 'OUTFIT 864';
    const result = {
      "autoFilled": true,
      "variantId": "18076",
      "timeLastSaved": "2019-04-02T06:00:00",
      "photo": "http://cdn.yoox.biz/49/49336277qw_10_f.jpg",
      "stock": 61,
      "price": "£910",
      "designerName": "On the Island by Marios Schwab",
      "colour": "GREEN",
      "filterColour": "GREEN",
      "classification": {
        "classification1": "",
        "classification2": "Coats and Jackest",
        "classification3": "Drawstring trousers"
      },
      "visibility": [
        {
          "name": "UKME",
          "visible": false
        },
        {
          "name": "AM"
        },
        {
          "name": "INTL",
          "visible": false,
          "stock": -2
        }
      ],
      "replacementVariants": {
        "changes": [
          [
            "120561",
            "166749",
            "97277",
            "103479",
            "129064",
            "157024",
            "126963",
            "75838",
            "94898",
            "172962",
            "142892",
            "143810",
            "133280",
            "169756"
          ]
        ],
        "changesPosition": 0,
        "saved": [
          "120561",
          "166749",
          "97277",
          "103479",
          "129064",
          "157024",
          "126963",
          "75838",
          "94898",
          "172962",
          "142892",
          "143810",
          "133280",
          "169756"
        ]
      }
    };

    // test
    const value = testFunc(state, input, input2, input3);
    expect(value).toEqual(result);
  });

  it("selectSlot: should return selected slot when no outfit is specified", () => {
    // setup
    const testFunc = selectors.selectSlot;
    const state = mockStore;
    const input = '1';
    const input2 = '13904';
    const result = {
      "autoFilled": false,
      "variantId": "13904",
      "timeLastSaved": "2018-10-26T06:00:00",
      "photo": "",
      "stock": 94,
      "price": "£1047",
      "designerName": "Chloé",
      "colour": "GREEN",
      "filterColour": "WHITE",
      "classification": {
        "classification1": "Clothing",
        "classification2": "Formal Shirts",
        "classification3": ""
      },
      "visibility": [
        {
          "name": "UKME"
        },
        {
          "name": "AM",
          "stock": -2
        },
        {
          "name": "INTL",
          "visible": true,
          "stock": -2
        }
      ],
      "replacementVariants": {
        "changes": [
          [
            "158282",
            "125332",
            "144903",
            "155178",
            "103401",
            "139769",
            "84977",
            "186708",
            "23858",
            "172509",
            "139425",
            "137414",
            "178297"
          ],
          ['1','2','3']
        ],
        "changesPosition": 1,
        "saved": [
          "158282",
          "125332",
          "144903",
          "155178",
          "103401",
          "139769",
          "84977",
          "186708",
          "23858",
          "172509",
          "139425",
          "137414",
          "178297"
        ]
      }
    };

    // test
    const value = testFunc(state, input, input2);
    expect(value).toEqual(result);
  });

  it("selectOutfitImage: should return outfit image", () => {
    // setup
    const testFunc = selectors.selectOutfitImage;
    const state = mockStore;
    const input = '1';
    const result = 'https://cache.mrporter.com/images/products/1010973/1010973_mrp_ou_l.jpg';

    // test
    const value = testFunc(state, input);
    expect(value).toEqual(result);
  });

  it("selectOutfitImagePreview: should return outfit image for preview", () => {
    // setup
    const testFunc = selectors.selectOutfitImagePreview;
    const state = mockStore;
    const input = '1';
    const input2 = 'OUTFIT 864';
    const result = 'http://iris/000099991.jpg';

    // test
    const value = testFunc(state, input, input2);
    expect(value).toEqual(result);
  });

  it("selectDescriptionContent: should return outfit description", () => {
    // setup
    const testFunc = selectors.selectDescriptionContent;
    const state = mockStore;
    const input = '1';
    const result = {"classification": {"classification1": "", "classification2": "Coats and Jackest", "classification3": "Drawstring trousers"}, "colour": "GREEN", "designerName": "Valentino", "filterColour": "TORQUOISE", "name": "Clerkenwell Cotton Shirt", "photo": "http://cdn.yoox.biz/49/49336277qw_10_f.jpg", "price": "£680", "season": "Continuity", "variantId": "1"};
    // test
    const value = testFunc(state, input);
    expect(value).toEqual(result);
  });

  it("selectSlotError: should return slot error", () => {
    // setup
    const testFunc = selectors.selectSlotError;
    const state = mockStore;
    const input = '1';
    const input2 = '87102';
    const result = "Invalid Variant";

    // test
    const value = testFunc(state, input, input2);
    expect(value).toEqual(result);
  });

  it("selectSlotError: should return slot error if outfit is specified", () => {
    // setup
    const testFunc = selectors.selectSlotError;
    const state = mockStore;
    const input = '1';
    const input2 = '87102';
    const input3 = 'OUTFIT 448';
    const result = "Invalid Variant";

    // test
    const value = testFunc(state, input, input2, input3);
    expect(value).toEqual(result);
  });

  it("selectSlotError: should return undefined if no slot error", () => {
    // setup
    const testFunc = selectors.selectSlotError;
    const state = mockStore;
    const input = '1';
    const input2 = '13904';
    const result = undefined;

    // test
    const value = testFunc(state, input, input2);
    expect(value).toEqual(result);
  });

  it("selectSlotAutofilled: should return true if autoFilled", () => {
    // setup
    const testFunc = selectors.selectSlotAutofilled;
    const state = mockStore;
    const input = '1';
    const input2 = '18076';
    const input3 = 'OUTFIT 864';
    const result = true;

    // test
    const value = testFunc(state, input, input2, input3);
    expect(value).toEqual(result);
  });

  it("selectSlotAutofilled: should return false if not autoFilled", () => {
    // setup
    const testFunc = selectors.selectSlotAutofilled;
    const state = mockStore;
    const input = '1';
    const input2 = '17100';
    const input3 = 'OUTFIT 448';
    const result = false;

    // test
    const value = testFunc(state, input, input2, input3);
    expect(value).toEqual(result);
  });

  it("selectReplacementIds: should return current replacement ids array", () => {
    // setup
    const testFunc = selectors.selectReplacementIds;
    const state = mockStore;
    const input = '1';
    const input2 = '13904';
    const result = ["1", "2", "3"];

    // test
    const value = testFunc(state, input, input2);
    expect(value).toEqual(result);
  });

  it("selectNumberOfItemsInSlot: should return number of slots", () => {
    // setup
    const testFunc = selectors.selectNumberOfItemsInSlot;
    const state = mockStore;
    const input = '1';
    const input2 = '13904';
    const result = 3;

    // test
    const value = testFunc(state, input, input2);
    expect(value).toEqual(result);
  });

  it("selectSavedReplacementIds: should return current saved set of ids", () => {
    // setup
    const testFunc = selectors.selectSavedReplacementIds;
    const state = mockStore;
    const input = '1';
    const input2 = '13904';
    const result = ["158282", "125332", "144903", "155178", "103401", "139769", "84977", "186708", "23858", "172509", "139425", "137414", "178297"];

    // test
    const value = testFunc(state, input, input2);
    expect(value).toEqual(result);
  });

  it("selectChanges: should return changes array", () => {
    // setup
    const testFunc = selectors.selectChanges;
    const state = mockStore;
    const input = '1';
    const input2 = '13904';
    const result = [
      [
        "158282",
        "125332",
        "144903",
        "155178",
        "103401",
        "139769",
        "84977",
        "186708",
        "23858",
        "172509",
        "139425",
        "137414",
        "178297"
      ],
      ['1','2','3']
    ];

    // test
    const value = testFunc(state, input, input2);
    expect(value).toEqual(result);
  });

  it("selectChangesPosition: should return current position for changes array", () => {
    // setup
    const testFunc = selectors.selectChangesPosition;
    const state = mockStore;
    const input = '1';
    const input2 = '13904';
    const result = 1;

    // test
    const value = testFunc(state, input, input2);
    expect(value).toEqual(result);
  });

  it("selectWIWVariant: should return selected variant object", () => {
    // setup
    const testFunc = selectors.selectWIWVariant;
    const state = mockStore;
    const subjectId = '1';
    const outfitId = 'OUTFIT 864';
    const associatedId = '18076';
    const variantId = '120561';
    const result = {
      "variantId": "120561",
      "photo": "http://cdn.yoox.biz/45/45383725vg_10_f.jpg",
      "stock": 54,
      "designerName": "",
      "price": "£777",
      "colour": "YELLOW",
      "filterColour": "WHITE",
      "classification": {
        "classification1": "",
        "classification2": "Casual Shirts",
        "classification3": ""
      },
      "manuallyAdded": true,
      "indicateAsManuallyAdded": true,
      "visibility": [
        {
          "name": "UKME"
        },
        {
          "name": "AM",
          "stock": -2
        },
        {
          "name": "INTL",
          "visible": true,
          "stock": -2
        }
      ]
    };

    // test
    const value = testFunc(state, subjectId, associatedId, variantId, outfitId);
    expect(value).toEqual(result);
  });

  it("selectWIWVariantError: should return selected variant object", () => {
    // setup
    const testFunc = selectors.selectWIWVariantError;
    const state = mockStore;
    const subjectId = '1';
    const outfitId = 'OUTFIT 864';
    const associatedId = '78435';
    const variantId = '77756';
    const result = 'Invalid Variant';

    // test
    const value = testFunc(state, subjectId, associatedId, variantId, outfitId);
    expect(value).toEqual(result);
  });

});
