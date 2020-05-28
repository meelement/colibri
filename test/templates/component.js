// Copyright 2020 Teros Technology
//
// Ismael Perez Rojo
// Carlos Alberto Ruiz Naranjo
// Alfredo Saez
//
// This file is part of Colibri.
//
// Colibri is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Colibri is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Colibri.  If not, see <https://www.gnu.org/licenses/>.

const colors = require('colors');
const fs = require('fs');
const path = require('path');
const Colibri = require('../../src/main');
const Codes = require('../../src/templates/codes')

var language = [Colibri.General.LANGUAGES.VHDL,Colibri.General.LANGUAGES.VERILOG];
var tested = [Colibri.Templates.Codes.TYPESCOMPONENTS.COMPONENT,
              Colibri.Templates.Codes.TYPESCOMPONENTS.INSTANCE,
              Colibri.Templates.Codes.TYPESCOMPONENTS.SIGNALS];

let options = []
for (let x=0;x<tested.length;++x){
  options[x] = {
    'type' : "normal",
    'version' : Colibri.General.VERILOGSTANDARS.VERILOG2001,
    'parameters' : [
      {'parameter' : "X"},
      {'parameter' : "Y"}
    ]
  }
}
console.log('****************************************************************');
var structure_vhdl = []
var expected_vhdl = []
var templates = []
for (let x=0;x<tested.length;++x){
  options[x]['type'] = tested[x];
  structure_vhdl[x] = fs.readFileSync('examples'+path.sep+language[0]+path.sep+'example_1.vhd','utf8');
  expected_vhdl[x] = fs.readFileSync('examples'+path.sep+language[0]+path.sep+tested[x] + '.txt','utf8');
  templates[x] = new Colibri.Templates.Templates();
  templates[x].getTemplate(Colibri.Templates.Codes.TYPES.COMPONENT,structure_vhdl,options[x]).then(out =>{
    if(expected_vhdl[x].replace(/\n/g,'').replace(/ /g,'').replace(/\r/g, '') === out.replace(/\n/g,'').replace(/ /g,'').replace(/\r/g, '')){
      console.log("Testing... " + tested[x] +" "+language[0]+": Ok!".green);
    }
    else{
      console.log("Testing... " + tested[x] +" "+language[0]+": Fail!".red);
      throw new Error('Test error.');
    }
  });
}

  // console.log('****************************************************************');
  // options['language'] = language[1];
  // for (let x=0;x<tested.length;++x){
  //   options['type'] = tested[x];
  //   var structure = fs.readFileSync('examples'+path.sep+language[i]+path.sep+'structure.json','utf8');
  //   var expected = fs.readFileSync('examples'+path.sep+language[i]+path.sep+tested[x] + '.txt','utf8');
  //   var templates = new Colibri.Templates.Templates();
  //   var out = templates.getTemplate(Colibri.Templates.Codes.TYPES.COMPONENT,structure,options);

  //   if(expected.replace(/\n/g,'').replace(/ /g,'').replace(/\r/g, '') === out.replace(/\n/g,'').replace(/ /g,'').replace(/\r/g, '')){
  //     console.log("Testing... " + tested[x] +" "+language[i]+": Ok!".green);
  //   }
  //   else{
  //     console.log("Testing... " + tested[x] +" "+language[i]+": Fail!".red);
  //     throw new Error('Test error.');
  //   }
  // }