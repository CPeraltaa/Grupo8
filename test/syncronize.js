
before(done => {
    console.log('\n\n-----------------------\n--\n-- START TEST\n--\n-------------------------');
    done();
});
after(done => {
    console.log('\n\n-----------------------\n--\n-- END TEST\n--\n-------------------------');
    done();
});
/* asyn test */
var assert = require('assert');
 
describe('Registro de proveedor', function() {
  describe('#registry()', function() {
 
    it('Exito', function() {
      assert.equal([1,2,3].indexOf(3), 2);
    });
  });
});

describe('Visualizar horario', function() {
  describe('#client(id)', function() {
 
    it('Exito', function() {
      assert.equal([1,2,3].indexOf(3), 2);
    });
  });
});

describe('Ingresar Horario', function() {
  describe('#horario()', function() {
 
    it('Exito', function() {
      assert.equal([1,2,3].indexOf(3), 2);
    });
  });
});

describe('Agendar Horarios', function() {
  describe('#schedule()', function() {
 
    it('Exito', function() {
      assert.equal([1,2,3].indexOf(3), 2);
    });
  });
});

describe('Visualizar SOlicitudes', function() {
  describe('#solicitud(id)', function() {
 
    it('Exito', function() {
      assert.equal([1,2,3].indexOf(3), 2);
    });
  });
});

describe('Aceptar Solicitud', function() {
  describe('#a_solicitud(id)', function() {

    it('Exito', function() {
      assert.equal([1,2,3].indexOf(3), 2);
    });
  });
});

describe('#mod_reserva()',function(){
  context('without arguments in body', function() {
      it('should return 0', function() {
        expect(mod_reserva(req,res)).to.equal(0)
      })
    })

    context('with arguments in body', function() {
      it('should return 1', function() {
        expect(mod_reserva(req, res)).to.equal(1)
      })
    })
    context('with data already taken', function() {
      it('should return 0', function() {
        expect(mod_reserva(req, res)).to.equal(0)
      })
    })
});