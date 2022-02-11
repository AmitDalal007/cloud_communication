import axios from 'axios'

export class CustomerService {
    async getPrompt() {
        // const response = await axios.get('assets/demo/data/customers-medium.json');
        const response = await axios.get('http://127.0.0.1:8000/api/prompts', {
            headers: {
                'Accept': '*/*',
            }
        });
        const json = await response.data;
        return json;
    }

    async getLead() {
        // const response = await axios.get('assets/demo/data/products-orders-small.json')
        const response = await axios.get('http://127.0.0.1:8000/api/leads', {
            headers: {
                'Accept': '*/*',
            }
        })
        const json = await response.data;
        return json;
    }

    async getCampaign() {
        // const response = await axios.get('assets/demo/data/countries.json');
        const response = await axios.get('http://127.0.0.1:8000/api/campaigns', {
            headers: {
                'Accept': '*/*',
            }
        });
        const json = await response.data;
        return json;
    }

    // For Contact
    async getContact() {
        const response = await axios.get('http://127.0.0.1:8000/api/contact', {
            headers: {
                'Accept': '*/*',
            }
        });
        const json = await response.data;
        return json;
    }

    // For Template
    async getTemplate() {
        const response = await axios.get('http://127.0.0.1:8000/api/template', {
            headers: {
                'Accept': '*/*',
            }
        });
        const json = await response.data;
        return json;
    }
    
}
