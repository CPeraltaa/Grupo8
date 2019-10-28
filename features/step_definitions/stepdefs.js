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






