const assert = require('assert');
const { Given, When, Then } = require('cucumber');




//VAlID LOGIN 
function ValidLogin(email,pass) {
    if (email === "jenny7127@gmail.com"){
        if (pass == "pass"){
            
            return "valid";
        }
        else{
            return "invalid";      
        }

    } else {
      return "invalid";
    }
  }
  Given('I enter my {string}  and {string}', function (string, string2) {
    this.string=string;
    this.string2=string2;
  });
  

  When('I click Login', function () {
    this.actualAnswer=ValidLogin(this.string,this.string2)+"";
  });






//VALID EMAIL



function EmailValido(mail) { 
    
	return /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail); 
    }

  Given('I enter my {string}', function (string) {
    this.string=string;
  });

  When('I click submit', function () {
    this.actualAnswer=EmailValido(this.string)+"";
  });

  Then('We should get {string}', function (string) {
    assert.equal(this.actualAnswer,string);
  });



  //Valid NAME and LASTNAME

  function validarNombres(nombre, apellido){
    return (/^[A-Z]+$/i.test(nombre) && /^[A-Z]+$/i.test(apellido));
    }
  
  
    Given('I enter my {string} and {string}', function (string, string2) {
      this.string=string;
      this.string2=string2;
    });
  
  
    When('I click submit again', function () {
      this.actualAnswer=validarNombres(this.string,this.string2)+"";
    });