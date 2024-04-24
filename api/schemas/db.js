import mongoose, { isObjectIdOrHexString } from 'mongoose'

const { Schema } = mongoose;

// Esquema para administradores
export const  AdministradorSchema = new Schema({
  email: String,
  nome: String,
  senha: String,
});

// Esquema para produtos do cardápio
export const  ProdutoSchema = new Schema({
  description: String,
  id: Number,
  image: String,
  name: String,
  price: Number,
  snack: String,
});

// Esquema para categorias do cardápio (burgers, drinks, icecreams, pizzas)
export const  CategoriaCardapioSchema = new Schema({
  produtos: [ProdutoSchema],
});

// Esquema para clientes
export const  ClienteSchema = new Schema({
  nome: String,
  telefone: String,
});

// Esquema para endereço
export const  EnderecoSchema = new Schema({
  bairro: String,
  cidade: String,
  numero: String,
  rua: String,
});

// Esquema para informações do negócio
export const  InformacoesNegocioSchema = new Schema({
    tema: {
        cor_de_fundo: { type: String, default: '#00f' },
        cor_da_fonte: { type: String, default: '#fff' }
    },
    logo: { type: String, default: '' },
    deliveryTax: { type: String, default: '0' }
});

// Esquema para pedidos
export const  ProdutoPedidoSchema = new Schema({
  descricao: String,
  imagem: String,
  nome: String,
  preco: String,
});

// export const PedidoSchema = new Schema({
//   cliente_id: { type: Schema.Types.ObjectId, ref: 'Cliente' },
//   produtos: [ProdutoPedidoSchema],
// });

const PedidoSchema = new Schema({
  status:{
    type: String,
    enum: ['Wait Confirmation','Accepted', 'Recused', 'InProduction', 'OnWay', 'Delivered'],
    required: true
  },
  orderNumber: {
    type: String,
    default: Date.now().toString()
  },
  clientId: {
    type: String,
    // Assuming formData is an object passed to the function or retrieved from somewhere
    // If formData.name is a string, then this should work, but ensure that it's properly defined before using it
  },
  total: {
    type: Number,
    required: true
  },
  customer: {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    shippingDetails: {
      deliveryMethod: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      address: {
        type: String,
      },
      number: {
        type: String
      },
      complement: {
        type: String
      },
      neighborhood: {
        type: String,
      },
      cellphone: {
        type: String,
        required: true
      },
      paymentMethod: {
        type: String,
        enum: ['Dinheiro', 'Pix'],
        required: true
      },
      moreDetails: {
        type: String
      },
      cashback: {
        type: Number
      }
    }
  },
  items: [
    {
      qtd: {
        type: Number,
        required: true
      },
      itemId: {
        type: Schema.Types.ObjectId,
        required: true
      },
      snack: {
        type: String,
        required: true
      },
      img: {
        type: String
      },
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ]
});

// Esquema principal
export const RestauranteSchema = new Schema({
  _id:{ type: String, required: true},
  email: { type: String, unique: true, required: true },
  nome: { type: String, required: true },
  senha: { type: String, required: true },
  telefone: { type: String, required: true },
  clientes: [
   {
    name:{ type: String, required: false },
    phone:{ type: String, required: false },
    address:{
      neighborhood:{ type: String, required: false },
      street:{ type: String, required: false },
      complement:{ type: String, required: false }
    }
   }
  ],
  pedidos: [PedidoSchema],
  cardapio: {
   type:Map,
   of:[ProdutoSchema],
   default:new Map()
  },
  endereco: EnderecoSchema,
  informacoes_negocio: InformacoesNegocioSchema,
  storeToken:{type:String}
});

RestauranteSchema.index({ _id: 1, email: 1 }, { unique: true });
// Modelo para o esquema principal
export const Restaurante = mongoose.model('Restaurante', RestauranteSchema);
