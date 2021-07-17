import { SiteClient } from 'datocms-client';

export default async function recebedorRequest(request, response) {

    if (request.method === 'POST') {
        const TOKEN = 'f74b197a312e0280763faad091cbd9';
        const client = new SiteClient(TOKEN);

        const registroCriado = await client.items.create({
            itemType: "975874",
            ...request.body,
            // title: "Teste",
            // imageUrl: "https://via.placeholder.com/150",
            // creatorSlug: "vinimyls"
        });

        response.json({
            registroCriado: registroCriado,
        })
        return;
    }

    response.status(404).json({
        message: "Ainda não temos nada no GET, mas no POST tem."
    })
}