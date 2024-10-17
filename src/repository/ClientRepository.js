import { instanciaPrisma } from "../database/connection.js";


export class ClientRepository {
    async mostrar() {
        try {
          const clientes = await instanciaPrisma.client.findMany({
            orderBy: { createdAt: "desc" },
          });
          return {
            // mensagem: "retornando os clientes de acordo com a sua inserção",
            clientes,
          };
        } catch (error) {
          throw error;
        }
      }

    async criar(name, rg, date_birth="1995-07-22", type, cpf, email,situation,telefone, celular,cep,logradouro,numero,complemento,bairro,cidade) {
        try {
          const data_aniversario = new Date(`${date_birth}T00:00:00Z`)
    
          const cadastrar_cliente = await instanciaPrisma.client.create({
            data: { name, rg, date_birth: data_aniversario, type, cpf, email,situation,telefone, celular},
          });
    
          const client_id = cadastrar_cliente.id
    
          const address = await instanciaPrisma.address.create({
            data: {cep,logradouro,numero,complemento,bairro,cidade}
          })
    
          const address_id = address.id
    
          console.log(client_id);
          console.log(address_id);
    
          const client_address = await instanciaPrisma.client_address.create({
            data: {client_id,address_id}
          })
          
          console.log(client_address);
          const message = { message: "Cadastro realizado com sucesso!" };
          return {cadastrar_cliente, message};
        } catch (error) {

          console.log(error);
          
          throw error;
        }
      }

    async deletar(cpf) {
        try {
          
          const client_id = await instanciaPrisma.client.findUnique({
            where: {
              cpf: cpf
            },
            select: {
              id: true
            }
          })
                
          const result = await instanciaPrisma.client.deleteMany(
            { 
              where: { id: client_id.id }
            });
          console.log(result);
          
          return { message: "cliente deletado com sucesso" };
        } catch (error) {
          console.log(error);
          
          throw error;
        }
      }

    async buscarUnico(cpf) {
        try {
          const cliente = await instanciaPrisma.client.findUnique({
            where: { cpf },
          });
          if (!cliente) {
            // const error =  new Error("Cliente não encontrado!")
            // error.statusCode  = 404
    
            throw new Error("Cliente não encontrado!");
    
            // throw new Error('Cliente não encontrado!');
          }
          return cliente;
        } catch (error) {
          console.log(error.statusCode);
    
          throw error;
        }
      }
      
    async update(id,name, rg, date_birth, type, cpf, email,situation,telefone, celular,cep,logradouro,numero,complemento,bairro,cidade) {
        try {
          const data_aniversario = new Date(`${date_birth}T00:00:00Z`)
          const client = await instanciaPrisma.client.update({
            where: { id },
            data: {
              name: name,
              rg: rg,
              date_birth: data_aniversario,
              type: type,
              cpf: cpf,
              email: email,
              situation: situation,
              telefone: telefone,
              celular: celular
            },
          });
    
          console.log(client.id);
    
          const address_id = await instanciaPrisma.client_address.findMany({
            where: {
              client_id: client.id
            },
            select: {
              address_id: true
            }
    
          });
    
          console.log();
    
          const address = await instanciaPrisma.address.update({
            where: {
              id: address_id[0].address_id
            },
            data: {
              cep: cep,
              logradouro: logradouro,
              numero: numero,
              complemento: complemento,
              bairro: bairro,
              cidade: cidade
            }
          })
          
    
    
    
    
    
    
          return { message: "Cliente atualizado com sucesso!" };
          // return cliente
        } catch (error) {
          console.log(error);
          throw error;
    
          // throw error
        }
      }
    
}

