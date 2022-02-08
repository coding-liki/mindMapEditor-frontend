<script>
    export let endpoint = ''; 
    export let controller = '';
    
    export let buildHeaders = () => {
        return {
            'Content-Type': 'application/json;charset=utf-8'
        }
    }

    export async function request(method, params = {}, httpMethod) {
        let options = {
            method: httpMethod,
            headers: buildHeaders(),
            body: JSON.stringify(params)
        }

        let response = await fetch(endpoint+'/'+controller+'/'+method, options);
        let result = await response.json();

        if(response.ok){
            return result;
        } else {
            throw Error(result);
        }

    }

    export async function get(method, params= {}){
        return await request(method, params, 'GET');
    }

    export async function post(method, params= {}){
        return await request(method, params, 'POST');
    }

    export async function put(method, params= {}){
        return await request(method, params, 'PUT');
    }

    export async function del(method, params= {}){
        return await request(method, params, 'DELETE');
    }
</script>