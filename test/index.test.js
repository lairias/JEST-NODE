import app from '../src/app'
import request from 'supertest'

//TEST DE RUTA TASKS
describe('GET /tasks',()=>{
    ////Deveria responder codigo estus 200
    test('should repond with a 200 status code ', async() => {
    const response =  await request(app).get('/tasks').send();
    // console.log(response)
    expect(response.status).toBe(200)
});
test('should respond with an Array',async()=>{
    const response =  await request(app).get('/tasks').send();
    expect(response.body).toBeInstanceOf(Array)
})
    
} )


describe('POST /tasks',()=>{
    describe('give a title and description', ()=>{
        const newTasks = {
            title : 'test tasks',
            description :"test description"
        }
        //should responde 200 staus code
        test('should responde with a 200 status code',async()=>{
            const response = await request(app).post('/tasks').send(newTasks)
            expect(response.statusCode).toBe(200);
        })
        //should responde with content-type of application/json
        test('should responde with content-type of application/json',async()=>{
            const response = await request(app).post('/tasks').send(newTasks)
            // expect(response.headers['content-type']).toBe('application/json')
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        })
        //should responde with Json object containing the new tasks with an id
       test('should responde with Json object containing the new tasks with an id',async()=>{
        const response = await request(app).post('/tasks').send(newTasks);
        expect(response.body.id).toBeDefined();
       })
      
    
    })

    describe('when tite and description is missing',()=>{
        test('should respond with a 400 status code', async()=>{
            const reponse = await request(app).post('/tasks').send({})
            expect(reponse.status).toBe(400)
        })
    })
    
})