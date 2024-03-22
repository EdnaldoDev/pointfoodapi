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
    deliveryMethod:{ type: String, required: true },
    total:{ type: String, required: true },
    customerId:{type:String, required:true},
    items:[{
      qtd:{ type: String, required: true },
      itemId:{type:String, required:true},
      snack:{type:String, required:true}
    }]
})

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
