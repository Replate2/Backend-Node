exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables
    return knex('users').insert([
    //   {
    //     "name": "Var",
    //     "username": "Varsh",
    //     "password": "Varsh1",
    //     "phone-number": "4507075000",
    //     "address": "123 First st, Hayward, CA"
    // },
    {
      "name": "Var",
      "username": "Varsh",
      "role": "both",
      "phone-number": "4507075000",
      "password": "$2a$08$LiC8Ti5jJiS/SR3b6.4/v.BS6i64HdKi9jOuGfotaTEqs62esqAr2"
    },
    // {
    //   "name": "Pari",
    //   "username": "Parimala",
    //   "password": "pari1",
    //   "phone-number": "6507075000",
    //   "address": "123 First st, Hayward, CA",
    //   "role": "donor"
    // },
    {
      "name": "Pari",
      "username": "Parimala",
      "role": "donor",
      "phone-number": "6507075000",
      "password": "$2a$08$cIU1DhSiEiEYg.rHs.ehyONjPLTW6WypowAzqa2IxZk/YfhkSYkm."
    },
    // {
    //   "name": "Harry",
    //   "username": "Harry Potter",
    //   "password": "Potter1",
    //   "phone-number": "5007075000",
    //   "address": "123 First st, Hayward, CA",
    //   "role": "donor"
    // },
    {
      "name": "Harry",
      "username": "Harry Potter",
      "role": "donor",
      "phone-number": "5007075000",
      "password": "$2a$08$/kIzbq5lpz5gtYOGytVt/.ra/TGXfZH.VWKrOdRrPOGG1gDAe0SsG"
    },
    // {
    //   "name": "Gandalf",
    //   "username": "Gandalf",
    //   "password": "dalf1",
    //   "phone-number": "4087075000",
    //   "address": "123 First st, Hayward, CA",
    //   "role": "volunteer"
    // },
    {
      "name": "Gandalf",
      "username": "Gandalf",
      "role": "volunteer",
      "phone-number": "4087075000",
      "password": "$2a$08$hTJfVsS/4IlKsLWfO8aKlOJFLXMePAIlxL6gRn1RrksE.by29L7JS"
    },
    // {
    //   "name": "Spencer",
    //   "username": "spencer",
    //   "password": "Spencer1",
    //   "phone-number": "5109009000",
    //   "address": "123 First st, Hayward, CA",
    //   "role": "donor"
    // },
    {
      "name": "Spencer",
      "username": "spencer",
      "role": "donor",
      "phone-number": "5109009000",
      "password": "$2a$08$CU/ZMJP6EbftVxSY1zlB4.y5yX6ujOPluqjlSbvqCp8xDdzmuJ4me"
    },
    // {
    //   "name": "Christina",
    //   "username": "christina",
    //   "password": "Christina1",
    //   "phone-number": "5997075000",
    //   "address": "123 First st, Hayward, CA",
    //   "role": "volunteer"
    // }
    {
      "name": "Christina",
      "username": "christina",
      "role": "volunteer",
      "phone-number": "5997075000",
      "password": "$2a$08$myne6/hzdEXQ08jUcS0Kq.kNBVwUao.zVML7xzFd01rQ1Z0T/oet."
    }
    ]);
};

// exports.seed = function(knex) {
//   return knex('table_name').del()/.truncate()
//     .then(function () {
//       // Inserts seed entries
//       return knex('table_name').insert([
//         {id: 1, colName: 'rowValue1'},
//         {id: 2, colName: 'rowValue2'},
//         {id: 3, colName: 'rowValue3'}
//       ]);
//     });
// };
