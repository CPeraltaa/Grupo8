//TDD
const app = require('../src/app');
const expect = require('expect');
const request = require('supertest');
before(done => {
    console.log('\n\n-----------------------\n--\n-- START TEST\n--\n-------------------------');
    done();
});
after(done => {
    console.log('\n\n-----------------------\n--\n-- END TEST\n--\n-------------------------');
    done();
});
describe('test-proveedor',function(){
    it('Creando nuevo proveedor ', (done)=>{
            send({
                username: 'nuevo',
                pass : '1234',
                email : 'nuevo@gmail.com',
                nombres : 'hola',
                apellidos : 'nesd'
            })
            .end(done)
    });
    it('error no se pudo crear nuevo proveedor', (done) =>{
        request(app)
        .post('/proveedor/registry')
        .send({})
        .expect(400)
        .end((err,res)=>{
            return done(err);
        });
    });

});

describe ("mod_historia",function(){
    it("should get current user citas", function(done){
        request(app).get('/client/cita/logged')
        .expect(200,done)
    });
    it("should posts a new schedule and deltes previous one", function(done){
        request(app).post('/cliente/mod_schedule')
        .send({current_sch:1,next_sch:2})
        .expect(302)
        .expect('Updated succesfully',done)
    });
});
//BDD for visualización de solicitud

describe ("solicitud", function(){
    it ("should get solicitudes that user have", function(done){
        request(app).get('/proveedor/solicitud')
        .expect(200, done)
    });
    it ("should change status of solicitud",function(done){
        request(app).post('/proveedor/solicitud/:id')
        .send({Solicitud_id:1})
        .expect(302)
        .expect('Updated succesfully', done)
    });
});

describe ('Calificar servicio', function(){
    describe ('Given a supplier with id', function(){
        it('Should return information from supplier', function(done){
            request(app).get('/proveedor/1')
            .expect(200, done);
        });
        describe ('And a customer with id', function(){
            it('should return json with the list of services supplied', function(done){
                request(app).get('proveedor/servicios/1')
                .expect('Content-Type', /json/)
                .expect(200, done);
            });
            describe ('When selected service is rated with stars', function(){
                it('Then save the rating in the BD', function(done){
                    request(app).post('/proveedor/rating/')
                    .send({service_rating:5})
                    .expect(302)
                    .expect('Inserted succesfully', done)
                });
            });            
        });
    });
});

describe ("vista login",function(){
    it("shouldgets get login view", function(done){
        request(app).get('/login')
        .expect(200,done)
    })
    
})
