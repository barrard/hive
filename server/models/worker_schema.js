const mongoose = require("mongoose");

const worker_schema = mongoose.Schema(
  {
    auth_method: String, //LOCAL, FACEBOOK, GOOGLE, etc...

    facebook: {
      id: String,
      token: String,
      facebook_account_confirm: Boolean
      // email: String,
      // name: String
    },

    google: {
      id: String,
      token: String,
      google_account_confirm: Boolean

      // email: String,
      // name: String
    },
    services: { type: [String], default: [] },

    primary_email: {
      type: String,
      unique: true,
      default: ""
    },
    emails: {
      type: [String],
      // unique: true,
      default: []
    },
    email_verifed: {
      type: Boolean,
      default: false
    },
    primary_phone: {
      type: String,
      default: ""
      // unique: true,
    },
    phone_numbers: {
      type: [String],
      default: []
    },
    phone_verified: {
      type: Boolean,
      default: false
    },
    firstname: {
      type: String,
      default: "firstname"
    },
    lastname: {
      type: String,
      default: "lastname"
    },
    display_name: {
      type: String,
      default: "Full Name"
    },
    main_profile_img: {
      type: String,
      default: ""
    },
    profile_imgs: {
      type: [String],
      default: []
    },
    password: {
      type: String,
      default: ""
    },
    address: {
      street_number: {
        type: String,
        default: "address line 1"
      },
      route: {
        type: String,
        default: "address line 2"
      },
      locality: {
        type: String,
        default: "City"
      },
      region: {
        type: String,
        default: "State"
      },
      postal_code: {
        type: String,
        default: "Zip"
      },
      country: {
        type: String,
        default: "Country"
      },
      lat: {
        type: Number,
        default: 0
      },
      lng: {
        type: Number,
        default: 0
      },
      formatted_address: {
        type: String,
        default: ""
      }
    },

    comments: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Comment", require: false }
    ],

    transactionHashes: {
      type: [String],
      default: []
    },
    transaction_receipt: {
      type: [{}],
      default: []
    },

    signed_terms_and_agreement: {
      type: Boolean,
      default: false
    },

    current_address: {
      street_number: {
        type: String,
        default: "address line 1"
      },
      route: {
        type: String,
        default: "address line 2"
      },
      locality: {
        type: String,
        default: "City"
      },
      region: {
        type: String,
        default: "State"
      },
      postal_code: {
        type: String,
        default: "Zip"
      },
      country: {
        type: String,
        default: "Country"
      },
      lat: {
        type: Number,
        default: 0
      },
      lng: {
        type: Number,
        default: 0
      },
      formatted_address: {
        type: String,
        default: ""
      }
    },

    comments: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Comment", require: false }
    ],

    transactionHashes: {
      type: [String],
      default: []
    },
    transaction_receipt: {
      type: [{}],
      default: []
    },
    socket_id: {
      type: String
    },

    notifications: [
      {
        data: {},
        time: {
          type: Date,
          default: Date.now
        },
        title: {
          type: String,
          default: ""
        },
        body: {
          type: String,
          default: ""
        },
        link_path: {
          type: String,
          default: ""
        },
        seen: {
          type: Boolean,
          default: false
        }
      }
    ]
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("Workers", worker_schema);
