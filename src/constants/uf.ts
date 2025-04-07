import { orderBy } from 'lodash'
export const ufs = [
  {
    value: 'AC',
    label: 'Acre',
  },
  {
    value: 'AL',
    label: 'Alagoas',
  },
  {
    value: 'AP',
    label: 'Amapá',
  },
  {
    value: 'AM',
    label: 'Amazonas',
  },
  {
    value: 'BA',
    label: 'Bahia',
  },
  {
    value: 'CE',
    label: 'Ceará',
  },
  {
    value: 'DF',
    label: 'Distrito Federal',
  },
  {
    value: 'ES',
    label: 'Espírito Santo',
  },
  {
    value: 'GO',
    label: 'Goiás',
  },
  {
    value: 'MA',
    label: 'Maranhão',
  },
  {
    value: 'MT',
    label: 'Mato Grosso',
  },
  {
    value: 'MS',
    label: 'Mato Grosso do Sul',
  },
  {
    value: 'MG',
    label: 'Minas Gerais',
  },
  {
    value: 'PA',
    label: 'Pará',
  },
  {
    value: 'PB',
    label: 'Paraíba',
  },
  {
    value: 'PR',
    label: 'Paraná',
  },
  {
    value: 'PE',
    label: 'Pernambuco',
  },
  {
    value: 'PI',
    label: 'Piauí',
  },
  {
    value: 'RJ',
    label: 'Rio de Janeiro',
  },
  {
    value: 'RN',
    label: 'Rio Grande do Norte',
  },
  {
    value: 'RS',
    label: 'Rio Grande do Sul',
  },
  {
    value: 'RO',
    label: 'Rondônia',
  },
  {
    value: 'RR',
    label: 'Roraima',
  },
  {
    value: 'SC',
    label: 'Santa Catarina',
  },
  {
    value: 'SP',
    label: 'São Paulo',
  },
  {
    value: 'SE',
    label: 'Sergipe',
  },
  {
    value: 'TO',
    label: 'Tocantins',
  },
]

export const civilState = [
  {
    value: 'casado',
    label: 'Casado(a)',
  },
  {
    value: 'solteiro',
    label: 'Solteiro(a)',
  },
  {
    value: 'divorciado',
    label: 'Divorciado(a)',
  },
  {
    value: 'viuvo',
    label: 'Viúvo(a)',
  },
  {
    value: 'uniao-estavel',
    label: 'União Estável',
  },
]

export const documentTypes = [
  {
    value: 'RG',
    label: 'RG',
  },
  {
    value: 'CNH',
    label: 'CNH',
  },
  {
    value: 'RNE',
    label: 'RNE',
  },
  {
    value: 'PASSAPORTE',
    label: 'PASSAPORTE',
  },
]

export const banks = [
  {
    label: '001 - Banco Do Brasil S.A.',
    value: '001 - Banco Do Brasil S.A.',
  },
  {
    label: '237 - Banco Bradesco S.A.',
    value: '237 - Banco Bradesco S.A.',
  },
  {
    label: '341 - Itau Unibanco S.A.',
    value: '341 - Itau Unibanco S.A.',
  },
  {
    label: '033 - Banco Santander (brasil) S.A.',
    value: '033 - Banco Santander (brasil) S.A.',
  },
  {
    label: '077 - Banco Intermedium S.A.',
    value: '077 - Banco Intermedium S.A.',
  },
  {
    label: '104 - Caixa Economica Federal',
    value: '104 - Caixa Economica Federal',
  },
  {
    label: '212 - Banco Original S.A.',
    value: '212 - Banco Original S.A.',
  },
  {
    label: '260 - Nu Pagamentos S.A.',
    value: '260 - Nu Pagamentos S.A.',
  },
  {
    label: '336 - C6 Bank S.A',
    value: '336 - C6 Bank S.A',
  },

  ...orderBy(
    [
      {
        label: '745 - Banco Citibank S.A.',
        value: '745 - Banco Citibank S.A.',
      },
      {
        label: '422 - Banco Safra S.A.',
        value: '422 - Banco Safra S.A.',
      },
      {
        label: '041 - Banco Do Estado Do Rio Grande Do Sul S.A',
        value: '041 - Banco Do Estado Do Rio Grande Do Sul S.A',
      },
      {
        label: '070 - Brb - Banco De Brasilia S.A.',
        value: '070 - Brb - Banco De Brasilia S.A.',
      },
      {
        label: '735 - Banco Pottencial S.A.',
        value: '735 - Banco Pottencial S.A.',
      },
      {
        label: '136 - Cc Unicred Do Brasil',
        value: '136 - Cc Unicred Do Brasil',
      },
      {
        label: '741 - Banco Ribeirao Preto S.A.',
        value: '741 - Banco Ribeirao Preto S.A.',
      },
      {
        label: '087 - Unicred Central Santa Catarina',
        value: '087 - Unicred Central Santa Catarina',
      },
      {
        label: '739 - Cetelem',
        value: '739 - Cetelem',
      },
      {
        label: '743 - Banco Semear S.A.',
        value: '743 - Banco Semear S.A.',
      },
      {
        label: '100 - Sc Planner',
        value: '100 - Sc Planner',
      },
      {
        label: '096 - Banco Bmfbovespa',
        value: '096 - Banco Bmfbovespa',
      },
      {
        label: '747 - Banco Rabobank International Brasil S.A.',
        value: '747 - Banco Rabobank International Brasil S.A.',
      },
      {
        label: '748 - Banco Cooperativo Sicredi S.A.',
        value: '748 - Banco Cooperativo Sicredi S.A.',
      },
      {
        label: '752 - Banco Bnp Paribas Brasil S.A',
        value: '752 - Banco Bnp Paribas Brasil S.A',
      },
      {
        label: '091 - Unicred Central Rs - Central De Coop Eco',
        value: '091 - Unicred Central Rs - Central De Coop Eco',
      },
      {
        label: '108 - Scfi Portocred',
        value: '108 - Scfi Portocred',
      },
      {
        label: '756 - Banco Cooperativo Do Brasil S.A.',
        value: '756 - Banco Cooperativo Do Brasil S.A.',
      },
      {
        label: '757 - Keb Hana Do Brasil',
        value: '757 - Keb Hana Do Brasil',
      },
      {
        label: '102 - Sc Xp Investimentos',
        value: '102 - Sc Xp Investimentos',
      },
      {
        label: '084 - Cc Uniprime Norte Do Parana',
        value: '084 - Cc Uniprime Norte Do Parana',
      },
      {
        label: '066 - Morgan Stanley',
        value: '066 - Morgan Stanley',
      },
      {
        label: '143 - Sc Treviso',
        value: '143 - Sc Treviso',
      },
      {
        label: '062 - Hipercard Banco Multiplo S.A',
        value: '062 - Hipercard Banco Multiplo S.A',
      },
      {
        label: '074 - Banco J. Safra S.A.',
        value: '074 - Banco J. Safra S.A.',
      },
      {
        label: '099 - Uniprime Central - Central Int De Coop D',
        value: '099 - Uniprime Central - Central Int De Coop D',
      },
      {
        label: '025 - Banco Alfa S/a',
        value: '025 - Banco Alfa S/a',
      },
      {
        label: '075 - Abn Amro',
        value: '075 - Abn Amro',
      },
      {
        label: '040 - Banco Cargill S.A',
        value: '040 - Banco Cargill S.A',
      },
      {
        label: '063 - Banco Bradescard S.A.',
        value: '063 - Banco Bradescard S.A.',
      },
      {
        label: '112 - Cc Brasil Central',
        value: '112 - Cc Brasil Central',
      },
      {
        label: '064 - Goldman Sachs Do Brasil-Banco Multiplo S',
        value: '064 - Goldman Sachs Do Brasil-Banco Multiplo S',
      },
      {
        label: '097 - Cooperativa Central De Credito Noroeste',
        value: '097 - Cooperativa Central De Credito Noroeste',
      },
      {
        label: '016 - Cc Creditran',
        value: '016 - Cc Creditran',
      },
      {
        label: '003 - Banco Da Amazonia S.A.',
        value: '003 - Banco Da Amazonia S.A.',
      },
      {
        label: '060 - Confidence Corretora De Cambio',
        value: '060 - Confidence Corretora De Cambio',
      },
      {
        label: '037 - Banco Do Estado Do Para S.A.',
        value: '037 - Banco Do Estado Do Para S.A.',
      },
      {
        label: '085 - Cooperativa Central De Credito Urbano -',
        value: '085 - Cooperativa Central De Credito Urbano -',
      },
      {
        label: '114 - Cecoopes-Central Das Coop De Econ E Cred',
        value: '114 - Cecoopes-Central Das Coop De Econ E Cred',
      },
      {
        label: '036 - Banco Bradesco Bbi S.A',
        value: '036 - Banco Bradesco Bbi S.A',
      },
      {
        label: '394 - Banco Bradesco Financiamentos S.A.',
        value: '394 - Banco Bradesco Financiamentos S.A.',
      },
      {
        label: '004 - Banco Do Nordeste Do Brasil S.A.',
        value: '004 - Banco Do Nordeste Do Brasil S.A.',
      },
      {
        label: '320 - Ccb Brasil',
        value: '320 - Ccb Brasil',
      },
      {
        label: '321 - Crefaz Sociedade de Crédito',
        value: '321 - Crefaz Sociedade de Crédito',
      },
      {
        label: '105 - Scfi Lecca',
        value: '105 - Scfi Lecca',
      },
      {
        label: '076 - Kdb Do Brasil',
        value: '076 - Kdb Do Brasil',
      },
      {
        label: '082 - Topazio',
        value: '082 - Topazio',
      },
      {
        label: '093 - Scm Polocred',
        value: '093 - Scm Polocred',
      },
      {
        label: '157 - Sc Icap',
        value: '157 - Sc Icap',
      },
      {
        label: '014 - Natixis Brasil S.A. - Banco Multiplo',
        value: '014 - Natixis Brasil S.A. - Banco Multiplo',
      },
      {
        label: '130 - Scfi Caruana',
        value: '130 - Scfi Caruana',
      },
      {
        label: '019 - Banco Azteca Do Brasil Sa',
        value: '019 - Banco Azteca Do Brasil Sa',
      },
      {
        label: '127 - Sc Codepe',
        value: '127 - Sc Codepe',
      },
      {
        label: '079 - Banco Original Do Agronegocio S.A.',
        value: '079 - Banco Original Do Agronegocio S.A.',
      },
      {
        label: '081 - Bbn Banco Brasileiro De Negocios S.A',
        value: '081 - Bbn Banco Brasileiro De Negocios S.A',
      },
      {
        label: '083 - Banco Da China Brasil S.A.',
        value: '083 - Banco Da China Brasil S.A.',
      },
      {
        label: '138 - Sc Get Money',
        value: '138 - Sc Get Money',
      },
      {
        label: '024 - Banco De Pernambuco S.A.-Bandepe',
        value: '024 - Banco De Pernambuco S.A.-Bandepe',
      },
      {
        label: '088 - Bm Randon',
        value: '088 - Bm Randon',
      },
      {
        label: '095 - Banco Confidence De Cambio Sa',
        value: '095 - Banco Confidence De Cambio Sa',
      },
      {
        label: '118 - Bi Standard Chartered',
        value: '118 - Bi Standard Chartered',
      },
      {
        label: '137 - Sc Multimoney',
        value: '137 - Sc Multimoney',
      },
      {
        label: '047 - Banco Do Estado De Sergipe S.A.',
        value: '047 - Banco Do Estado De Sergipe S.A.',
      },
      {
        label: '126 - Bi Br Partners',
        value: '126 - Bi Br Partners',
      },
      {
        label: '147 - Sc Rico',
        value: '147 - Sc Rico',
      },
      {
        label: '123 - Scfi Agiplan',
        value: '123 - Scfi Agiplan',
      },
      {
        label: '119 - Western Union',
        value: '119 - Western Union',
      },
      {
        label: '254 - Parana Banco S.A.',
        value: '254 - Parana Banco S.A.',
      },
      {
        label: '107 - Banco Bbm S.A',
        value: '107 - Banco Bbm S.A',
      },
      {
        label: '412 - Banco Capital S.A.',
        value: '412 - Banco Capital S.A.',
      },
      {
        label: '124 - Banco Woori Bank Do Brasil S.A',
        value: '124 - Banco Woori Bank Do Brasil S.A',
      },
      {
        label: '149 - Scfi Facta Financeira',
        value: '149 - Scfi Facta Financeira',
      },
      {
        label: '142 - Sc Broker Brasil',
        value: '142 - Sc Broker Brasil',
      },
      {
        label: '389 - Banco Mercantil Do Brasil S.A.',
        value: '389 - Banco Mercantil Do Brasil S.A.',
      },
      {
        label: '184 - Itau Bba',
        value: '184 - Itau Bba',
      },
      {
        label: '634 - Banco Triangulo S.A.',
        value: '634 - Banco Triangulo S.A.',
      },
      {
        label: '013 - Sc Senso',
        value: '013 - Sc Senso',
      },
      {
        label: '132 - Icbc Do Brasil Banco Multiplo S.A.',
        value: '132 - Icbc Do Brasil Banco Multiplo S.A.',
      },
      {
        label: '129 - Ubs Brasil Banco De Investimento S.A.',
        value: '129 - Ubs Brasil Banco De Investimento S.A.',
      },
      {
        label: '128 - Bcam Ms Bank',
        value: '128 - Bcam Ms Bank',
      },
      {
        label: '146 - Sc Guitta',
        value: '146 - Sc Guitta',
      },
      {
        label: '021 - Banestes S.A Banco Do Estado Do Espirito',
        value: '021 - Banestes S.A Banco Do Estado Do Espirito',
      },
      {
        label: '246 - Banco Abc Brasil S.A.',
        value: '246 - Banco Abc Brasil S.A.',
      },
      {
        label: '751 - Scotiabank Brasil S.A Banco Multiplo',
        value: '751 - Scotiabank Brasil S.A Banco Multiplo',
      },
      {
        label: '208 - Banco Btg Pactual S.A.',
        value: '208 - Banco Btg Pactual S.A.',
      },
      {
        label: '746 - Banco Modal S.A.',
        value: '746 - Banco Modal S.A.',
      },
      {
        label: '241 - Banco Classico S.A.',
        value: '241 - Banco Classico S.A.',
      },
      {
        label: '612 - Banco Guanabara S.A.',
        value: '612 - Banco Guanabara S.A.',
      },
      {
        label: '604 - Banco Industrial Do Brasil S. A.',
        value: '604 - Banco Industrial Do Brasil S. A.',
      },
      {
        label: '505 - Banco Credit Suisse (brasil) S.A.',
        value: '505 - Banco Credit Suisse (brasil) S.A.',
      },
      {
        label: '300 - Banco De La Nacion Argentina',
        value: '300 - Banco De La Nacion Argentina',
      },
      {
        label: '477 - Citibank N.A.',
        value: '477 - Citibank N.A.',
      },
      {
        label: '266 - Banco Cedula S.A.',
        value: '266 - Banco Cedula S.A.',
      },
      {
        label: '122 - Bradesco Berj',
        value: '122 - Bradesco Berj',
      },
      {
        label: '376 - Banco J.P. Morgan S.A.',
        value: '376 - Banco J.P. Morgan S.A.',
      },
      {
        label: '263 - Banco Cacique S.A.',
        value: '263 - Banco Cacique S.A.',
      },
      {
        label: '473 - Banco Caixa Geral - Brasil S.A.',
        value: '473 - Banco Caixa Geral - Brasil S.A.',
      },
      {
        label: '248 - Banco Boa Vista Interatlantico S.A',
        value: '248 - Banco Boa Vista Interatlantico S.A',
      },
      {
        label: '120 - Banco Rodobens S.A',
        value: '120 - Banco Rodobens S.A',
      },
      {
        label: '265 - Banco Fator S.A.',
        value: '265 - Banco Fator S.A.',
      },
      {
        label: '134 - Dtvm Bgc Liquidez',
        value: '134 - Dtvm Bgc Liquidez',
      },
      {
        label: '641 - Banco Alvorada S.A.',
        value: '641 - Banco Alvorada S.A.',
      },
      {
        label: '719 - Banif-Banco Internacional Do Funchal (br',
        value: '719 - Banif-Banco Internacional Do Funchal (br',
      },
      {
        label: '029 - Itau Bmg Consignado',
        value: '029 - Itau Bmg Consignado',
      },
      {
        label: '243 - Banco Maxima S.A.',
        value: '243 - Banco Maxima S.A.',
      },
      {
        label: '078 - Bi Haitong Do Brasil',
        value: '078 - Bi Haitong Do Brasil',
      },
      {
        label: '111 - Dtvm Oliveira Trust',
        value: '111 - Dtvm Oliveira Trust',
      },
      {
        label: '017 - Bny Mellon S.A.',
        value: '017 - Bny Mellon S.A.',
      },
      {
        label: '151 - Banco Nossa Caixa S.A',
        value: '151 - Banco Nossa Caixa S.A',
      },
      {
        label: '495 - Banco De La Provincia De Buenos Aires',
        value: '495 - Banco De La Provincia De Buenos Aires',
      },
      {
        label: '125 - Brasil Plural S.A. Banco Multiplo',
        value: '125 - Brasil Plural S.A. Banco Multiplo',
      },
      {
        label: '488 - Jpmorgan Chase Bank',
        value: '488 - Jpmorgan Chase Bank',
      },
      {
        label: '065 - Andbank',
        value: '065 - Andbank',
      },
      {
        label: '492 - Ing Bank',
        value: '492 - Ing Bank',
      },
      {
        label: '145 - Sc Levycam',
        value: '145 - Sc Levycam',
      },
      {
        label: '250 - Bcv - Banco De Credito E Varejo S.A',
        value: '250 - Bcv - Banco De Credito E Varejo S.A',
      },
      {
        label: '494 - Banco De La Republica Oriental Del Urugu',
        value: '494 - Banco De La Republica Oriental Del Urugu',
      },
      {
        label: '213 - Banco Arbi S.A.',
        value: '213 - Banco Arbi S.A.',
      },
      {
        label: '139 - Intesa Sanpaolo',
        value: '139 - Intesa Sanpaolo',
      },
      {
        label: '018 - Bm Tricury',
        value: '018 - Bm Tricury',
      },
      {
        label: '630 - Intercap',
        value: '630 - Intercap',
      },
      {
        label: '224 - Banco Fibra S.A.',
        value: '224 - Banco Fibra S.A.',
      },
      {
        label: '600 - Banco Luso Brasileiro S.A.',
        value: '600 - Banco Luso Brasileiro S.A.',
      },
      {
        label: '623 - Pan',
        value: '623 - Pan',
      },
      {
        label: '204 - Banco Bradesco Cartoes S.A.',
        value: '204 - Banco Bradesco Cartoes S.A.',
      },
      {
        label: '655 - Banco Votorantim S.A.',
        value: '655 - Banco Votorantim S.A.',
      },
      {
        label: '479 - Banco Itaubank S.A.',
        value: '479 - Banco Itaubank S.A.',
      },
      {
        label: '456 - Banco De Tokyo Mitsubishi Ufj Brasil S.A',
        value: '456 - Banco De Tokyo Mitsubishi Ufj Brasil S.A',
      },
      {
        label: '464 - Banco Sumitomo Mitsui Brasileiro S.A.',
        value: '464 - Banco Sumitomo Mitsui Brasileiro S.A.',
      },
      {
        label: '652 - Banco Itau Holding Financeira S.A',
        value: '652 - Banco Itau Holding Financeira S.A',
      },
      {
        label: '637 - Banco Sofisa S.A.',
        value: '637 - Banco Sofisa S.A.',
      },
      {
        label: '653 - Banco Indusval S.A.',
        value: '653 - Banco Indusval S.A.',
      },
      {
        label: '230 - Unicard Banco Multiplo S.A',
        value: '230 - Unicard Banco Multiplo S.A',
      },
      {
        label: '370 - Mizuho',
        value: '370 - Mizuho',
      },
      {
        label: '740 - Banco Barclays S.A.',
        value: '740 - Banco Barclays S.A.',
      },
      {
        label: '249 - Banco Investcred Unibanco S.A',
        value: '249 - Banco Investcred Unibanco S.A',
      },
      {
        label: '318 - Banco Bmg S.A.',
        value: '318 - Banco Bmg S.A.',
      },
      {
        label: '214 - Banco Dibens S.A.',
        value: '214 - Banco Dibens S.A.',
      },
      {
        label: '626 - Banco Ficsa S.A.',
        value: '626 - Banco Ficsa S.A.',
      },
      {
        label: '366 - Banco Societe Generale Brasil S.A',
        value: '366 - Banco Societe Generale Brasil S.A',
      },
      {
        label: '113 - Sc Magliano',
        value: '113 - Sc Magliano',
      },
      {
        label: '131 - Tullett Prebon Brasil Corretora de Valores e Câmbio Ltda.',
        value: '131 - Tullett Prebon Brasil Corretora de Valores e Câmbio Ltda.',
      },
      {
        label: '011 - Credit Suisse Hedging-Griffo Corretora de Valores S.A',
        value: '011 - Credit Suisse Hedging-Griffo Corretora de Valores S.A',
      },
      {
        label: '611 - Banco Paulista S.A.',
        value: '611 - Banco Paulista S.A.',
      },
      {
        label: '755 - Bank Of America Merrill Lynch Banco Mult',
        value: '755 - Bank Of America Merrill Lynch Banco Mult',
      },
      {
        label: '089 - Cooperativa de Crédito Rural da Região da Mogiana',
        value: '089 - Cooperativa de Crédito Rural da Região da Mogiana',
      },
      {
        label: '643 - Banco Pine S.A.',
        value: '643 - Banco Pine S.A.',
      },
      {
        label: '140 - Sc Easynvest',
        value: '140 - Sc Easynvest',
      },
      {
        label: '707 - Banco Daycoval S.A.',
        value: '707 - Banco Daycoval S.A.',
      },
      {
        label: '101 - Dtvm Renascenca',
        value: '101 - Dtvm Renascenca',
      },
      {
        label: '487 - Deutsche Bank S. A. - Banco Alemao',
        value: '487 - Deutsche Bank S. A. - Banco Alemao',
      },
      {
        label: '233 - Banco Cifra S.A.',
        value: '233 - Banco Cifra S.A.',
      },
      {
        label: '167 - Sc S. Hayata',
        value: '167 - Sc S. Hayata',
      },
      {
        label: '633 - Banco Rendimento S.A.',
        value: '633 - Banco Rendimento S.A.',
      },
      {
        label: '409 - Unibanco - União de Bancos Brasileiros S.A.',
        value: '409 - Unibanco - União de Bancos Brasileiros S.A.',
      },
      {
        label: '218 - Banco BS2 S.A.',
        value: '218 - Banco BS2 S.A.',
      },
      {
        label: '090 - Cooperativa Central De Credito Do Estado',
        value: '090 - Cooperativa Central De Credito Do Estado',
      },
      {
        label: '080 - BT Corretora de Câmbio Ltda.',
        value: '080 - BT Corretora de Câmbio Ltda.',
      },
      {
        label: '753 - Nbc Bank Brasil S.A.- Banco Multiplo',
        value: '753 - Nbc Bank Brasil S.A.- Banco Multiplo',
      },
      {
        label: '222 - Banco Credit Agricole Brasil S.A.',
        value: '222 - Banco Credit Agricole Brasil S.A.',
      },
      {
        label: '754 - Banco Sistema',
        value: '754 - Banco Sistema',
      },
      {
        label: '098 - Credialianca Cooperativa De Credito Rura',
        value: '098 - Credialianca Cooperativa De Credito Rura',
      },
      {
        label: '610 - Banco Vr S.A.',
        value: '610 - Banco Vr S.A.',
      },
      {
        label: '712 - Banco Ourinvest S.A.',
        value: '712 - Banco Ourinvest S.A.',
      },
      {
        label: '010 - Cc Credicoamo Credito Rural Cooperativa',
        value: '010 - Cc Credicoamo Credito Rural Cooperativa',
      },
      {
        label: '217 - Banco John Deere S.A.',
        value: '217 - Banco John Deere S.A.',
      },
      {
        label: '117 - Advanced Corretora de Câmbio Ltda.',
        value: '117 - Advanced Corretora de Câmbio Ltda.',
      },
      {
        label: '654 - Banco A.J. Renner S.A.',
        value: '654 - Banco A.J. Renner S.A.',
      },
      {
        label: '180 - CM Capital Markets Corretora de Câmbio, Títulos e Valores Mobiliários Ltda.',
        value: '180 - CM Capital Markets Corretora de Câmbio, Títulos e Valores Mobiliários Ltda.',
      },
      {
        label: '190 - Servicoop',
        value: '190 - Servicoop',
      },
      {
        label: '191 - Nova Futura Corretora de Títulos e Valores Mobiliários Ltda.',
        value: '191 - Nova Futura Corretora de Títulos e Valores Mobiliários Ltda.',
      },
      {
        label: '012 - Banco Inbursa S.A.',
        value: '012 - Banco Inbursa S.A.',
      },
      {
        label: '159 - Casa do Crédito S.A.Sociedade de Crédito ao Microempreendedor',
        value: '159 - Casa do Crédito S.A.Sociedade de Crédito ao Microempreendedor',
      },
      {
        label: '172 - Albatross Corretora de Câmbio e Valores S.A',
        value: '172 - Albatross Corretora de Câmbio e Valores S.A',
      },
      {
        label: '189 - HS Financeira S / A Crédito, Financiamento e Investimentos',
        value: '189 - HS Financeira S / A Crédito, Financiamento e Investimentos',
      },
      {
        label: '273 - Cooperativa de Crédito Rural de São Miguel do Oeste - Sulcredi / São Miguel',
        value: '273 - Cooperativa de Crédito Rural de São Miguel do Oeste - Sulcredi / São Miguel',
      },
      {
        label: '183 - Socred S.A.- Sociedade de Crédito ao Microempreendedor',
        value: '183 - Socred S.A.- Sociedade de Crédito ao Microempreendedor',
      },
      {
        label: '133 - Conf. Nacional das Cooperativas Centrais de Crédito e Economia Familiar',
        value: '133 - Conf. Nacional das Cooperativas Centrais de Crédito e Economia Familiar',
      },
      {
        label: '276 - Senff S.A.- Crédito, Financiamento e Investimento',
        value: '276 - Senff S.A.- Crédito, Financiamento e Investimento',
      },
      {
        label: '144 - Bexs Banco de Câmbio S.A.',
        value: '144 - Bexs Banco de Câmbio S.A.',
      },
      {
        label: '173 - BRL Trust Distribuidora de Títulos e Valores Mobiliários S.A.',
        value: '173 - BRL Trust Distribuidora de Títulos e Valores Mobiliários S.A.',
      },
      {
        label: '268 - Barigui Companhia Hipotecária',
        value: '268 - Barigui Companhia Hipotecária',
      },
      {
        label: '197 - Stone Pagamentos S.A.',
        value: '197 - Stone Pagamentos S.A.',
      },
      {
        label: '545 - Senso Corretora de Câmbio e Valores Mobiliários S.A.',
        value: '545 - Senso Corretora de Câmbio e Valores Mobiliários S.A.',
      },
      {
        label: '298 - Vips Corretora de Câmbio Ltda.',
        value: '298 - Vips Corretora de Câmbio Ltda.',
      },
      {
        label: '194 - Parmetal Distribuidora de Títulos e Valores Mobiliários Ltda.',
        value: '194 - Parmetal Distribuidora de Títulos e Valores Mobiliários Ltda.',
      },
      {
        label: '163 - Commerzbank Brasil S.A.- Banco Múltiplo',
        value: '163 - Commerzbank Brasil S.A.- Banco Múltiplo',
      },
      {
        label: '280 - Avista S.A.Crédito, Financiamento e Investimento',
        value: '280 - Avista S.A.Crédito, Financiamento e Investimento',
      },
      {
        label: '279 - Cooperativa de Crédito Rural de Primavera do Leste',
        value: '279 - Cooperativa de Crédito Rural de Primavera do Leste',
      },
      {
        label: '182 - Dacasa Financeira S / A - Sociedade de Crédito, Financiamento e Investimento',
        value: '182 - Dacasa Financeira S / A - Sociedade de Crédito, Financiamento e Investimento',
      },
      {
        label: '278 - Genial Investimentos Corretora de Valores Mobiliários S.A.',
        value: '278 - Genial Investimentos Corretora de Valores Mobiliários S.A.',
      },
      {
        label: '271 - IB Corretora de Câmbio, Títulos e Valores Mobiliários Ltda.',
        value: '271 - IB Corretora de Câmbio, Títulos e Valores Mobiliários Ltda.',
      },
      {
        label: '196 - Fair Corretora de Câmbio S.A.',
        value: '196 - Fair Corretora de Câmbio S.A.',
      },
      {
        label: '188 - Ativa Investimentos S.A.Corretora de Títulos Câmbio e Valores',
        value: '188 - Ativa Investimentos S.A.Corretora de Títulos Câmbio e Valores',
      },
      {
        label: '174 - Pernambucanas Financiadora S.A.Crédito, Financiamento e Investimento',
        value: '174 - Pernambucanas Financiadora S.A.Crédito, Financiamento e Investimento',
      },
      {
        label: '253 - Bexs Corretora de Câmbio S / A',
        value: '253 - Bexs Corretora de Câmbio S / A',
      },
      {
        label: '269 - HSBC Brasil S.A.Banco de Investimento',
        value: '269 - HSBC Brasil S.A.Banco de Investimento',
      },
      {
        label: '270 - Sagitur Corretora de Câmbio Ltda.',
        value: '270 - Sagitur Corretora de Câmbio Ltda.',
      },
      {
        label: '288 - Carol Distribuidora de Títulos e Valores Mobiliários Ltda.',
        value: '288 - Carol Distribuidora de Títulos e Valores Mobiliários Ltda.',
      },
      {
        label: '177 - Guide Investimentos S.A.Corretora de Valores',
        value: '177 - Guide Investimentos S.A.Corretora de Valores',
      },
      {
        label: '169 - Banco Olé Bonsucesso Consignado S.A.',
        value: '169 - Banco Olé Bonsucesso Consignado S.A.',
      },
      {
        label:
          '283 - RB Capital Investimentos Distribuidora de Títulos e Valores Mobiliários Ltda.',
        value:
          '283 - RB Capital Investimentos Distribuidora de Títulos e Valores Mobiliários Ltda.',
      },
      {
        label: '272 - AGK Corretora de Câmbio S.A',
        value: '272 - AGK Corretora de Câmbio S.A',
      },
      {
        label: '399 - Kirton Bank S.A - Banco Múltiplo',
        value: '399 - Kirton Bank S.A - Banco Múltiplo',
      },
      {
        label: '015 - UBS Brasil Corretora de Câmbio, Títulos e Valores Mobiliários S.A.',
        value: '015 - UBS Brasil Corretora de Câmbio, Títulos e Valores Mobiliários S.A.',
      },
      {
        label: '307 - Terra Investimentos Distribuidora de Títulos e Valores Mobiliários Ltda.',
        value: '307 - Terra Investimentos Distribuidora de Títulos e Valores Mobiliários Ltda.',
      },
      {
        label: '286 - Cooperativa de Crédito Rural de Ouro Sulcredi/Ouro',
        value: '286 - Cooperativa de Crédito Rural de Ouro Sulcredi/Ouro',
      },
      {
        label: '290 - Pagseguro Internet S.A.',
        value: '290 - Pagseguro Internet S.A.',
      },
      {
        label: '121 - Banco Agibank S.A',
        value: '121 - Banco Agibank S.A',
      },
      {
        label: '094 - Banco Finaxis S.A.',
        value: '094 - Banco Finaxis S.A.',
      },
      {
        label: '092 - BRK S.A. Crédito, Financiamento e Investimento',
        value: '092 - BRK S.A. Crédito, Financiamento e Investimento',
      },
      {
        label: '301 - BPP Instituição de Pagamento S.A.',
        value: '301 - BPP Instituição de Pagamento S.A.',
      },
      {
        label: '309 - Cambionet Corretora de Câmbio Ltda.',
        value: '309 - Cambionet Corretora de Câmbio Ltda.',
      },
      {
        label: '310 - Vortx Distribuidora de Títulos e Valores Mobiliários Ltda.',
        value: '310 - Vortx Distribuidora de Títulos e Valores Mobiliários Ltda.',
      },
      {
        label: '292 - BS2 Distribuidora de Títulos e Valores Mobiliários S.A.',
        value: '292 - BS2 Distribuidora de Títulos e Valores Mobiliários S.A.',
      },
      {
        label: '613 - Omni Banco S.A',
        value: '613 - Omni Banco S.A',
      },
      {
        label: '069 - Banco Crefisa S.A',
        value: '069 - Banco Crefisa S.A',
      },
      {
        label: '293 - Lastro RDV Distribuidora de Títulos e Valores Mobiliários Ltda.',
        value: '293 - Lastro RDV Distribuidora de Títulos e Valores Mobiliários Ltda.',
      },
      {
        label: '285 - Frente Corretora de Câmbio Ltda.',
        value: '285 - Frente Corretora de Câmbio Ltda.',
      },
      {
        label: '281 - Cooperativa de Crédito Rural Coopavel',
        value: '281 - Cooperativa de Crédito Rural Coopavel',
      },
    ],
    'value'
  ),
]

export const getBankByCode = (id: string) => {
  const selectedBank = banks.find((obj) => Number(obj.value) === Number(id))
  if (selectedBank) {
    return selectedBank.label
  }
  return ''
}

export const accountType = [
  {
    value: 'corrente',
    label: 'Conta corrente',
  },
  {
    value: 'poupanca',
    label: 'Poupança',
  },
]

export const accountTypeDescriptions: Record<string, string> = {
  corrente: 'Conta corrente',
  poupanca: 'Poupança',
}

export const discountReasons = [
  {
    label: 'Sem divergência',
    value: 'sem-divergencia',
  },
  {
    label: 'Pensão alimenticia',
    value: 'pensao-alimenticia',
  },
  {
    label: 'Férias',
    value: 'ferias',
  },
  {
    label: 'Demissão',
    value: 'demissao',
  },
  {
    label: 'Afastado',
    value: 'afastado',
  },
  {
    label: 'Invalidez',
    value: 'invalidez',
  },
  {
    label: 'Óbito',
    value: 'obito',
  },
  {
    label: 'Fraude',
    value: 'fraude',
  },
  {
    label: 'Outros',
    value: 'outros',
  },
]

export const genre = [
  { label: 'Masculino', value: 'M' },
  { label: 'Feminino', value: 'F' },
]

export const genreDropdown = [
  { text: 'Masculino', value: 'M' },
  { text: 'Feminino', value: 'F' },
]
