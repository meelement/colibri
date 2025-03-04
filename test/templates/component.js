/* eslint-disable no-console */
// Copyright 2020-2021 Teros Technology
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

// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const fs = require('fs');
const path = require('path');
const Colibri = require('../../src/main');
const Codes = require('../../src/templates/codes');

var language = [Colibri.General.LANGUAGES.VHDL,Colibri.General.LANGUAGES.VERILOG];
var tested_vhdl = [Codes.TYPESCOMPONENTS.COMPONENT,
              Codes.TYPESCOMPONENTS.INSTANCE,
              Codes.TYPESCOMPONENTS.SIGNALS,
              Codes.TYPESCOMPONENTS.INSTANCE_VHDL2008,
              Codes.TYPESCOMPONENTS.MIX_INSTANCE,
            ];
var tested_v = [Codes.TYPESCOMPONENTS.COMPONENT,
              Codes.TYPESCOMPONENTS.INSTANCE,
              Codes.TYPESCOMPONENTS.SIGNALS,
              Codes.TYPESCOMPONENTS.MIX_COMPONENT,
              Codes.TYPESCOMPONENTS.MIX_INSTANCE
            ];


var structure_vhdl = [];
var expected_vhdl = [];
for (let x=0;x<tested_vhdl.length;++x){
  structure_vhdl[x] = fs.readFileSync(__dirname + path.sep + 'examples'+path.sep+language[0]
        +path.sep+'example_0.vhd','utf8');
  expected_vhdl[x]  = fs.readFileSync(__dirname + path.sep + 'examples'+path.sep+language[0]
        +path.sep+tested_vhdl[x] + '.txt','utf8');
}
let options_c = {'type' : "normal"};
let options_i = {'type' : "normal"};
let options_i_2008 = {'type' : "normal"};
let options_s = {'type' : "normal"};
let options_i_2008_mix = {'type' : "normal"};

let templates_vhdl = new Colibri.Templates.Templates_factory();
let templates_vhdl_class = templates_vhdl.get_template(Codes.TYPES.COMPONENT,language[0]);
options_c['type'] = tested_vhdl[0]; // component
templates_vhdl_class.generate(structure_vhdl[0],options_c).then(
  out =>{ check(expected_vhdl[0],out,tested_vhdl[0],language[0]); });
options_i['type'] = tested_vhdl[1]; // instance
templates_vhdl_class.generate(structure_vhdl[1],options_i).then(
  out =>{ check(expected_vhdl[1],out,tested_vhdl[1],language[0]); });
options_s['type'] = tested_vhdl[2]; // signals
templates_vhdl_class.generate(structure_vhdl[2],options_s).then(
  out =>{ check(expected_vhdl[2],out,tested_vhdl[2],language[0]); });
options_i_2008['type'] = tested_vhdl[3]; // instance 2008
templates_vhdl_class.generate(structure_vhdl[3],options_i_2008).then(
  out =>{ check(expected_vhdl[3],out,tested_vhdl[3],language[0]); });

let mix_templates_vhdl_class = templates_vhdl.get_template(Codes.TYPES.MIX_COMPONENT,language[0]);
options_i_2008_mix['type'] = tested_vhdl[4]; // mix_instance
mix_templates_vhdl_class.generate(structure_vhdl[4],options_i_2008_mix).then(
  out =>{ check(expected_vhdl[4],out,tested_vhdl[4],language[0]); });


var structure_verilog = [];
var expected_verilog = [];
for (let x=0;x<tested_v.length;++x){
  structure_verilog[x] = fs.readFileSync(__dirname + path.sep + 'examples'+path.sep+language[1]
                          +path.sep+'example_0.v','utf8');
  expected_verilog[x]  = fs.readFileSync(__dirname + path.sep + 'examples'+path.sep+language[1]
                          +path.sep+tested_v[x] + '.txt','utf8');
}
let options_ver_c = {'type' : "normal"};
let options_ver_i = {'type' : "normal"};
let options_ver_s = {'type' : "normal"};
let options_ver_c_mix = {'type' : "normal"};
let options_ver_i_mix = {'type' : "normal"};
let templates_verilog = new Colibri.Templates.Templates_factory();
let templates_verilog_class = templates_verilog.get_template(Codes.TYPES.COMPONENT,language[1]);
options_ver_c['type'] = tested_v[0]; // component
templates_verilog_class.generate(structure_verilog[0],options_ver_c).then(
                        out =>{ check(expected_verilog[0],out,tested_v[0],language[1]); });
options_ver_i['type'] = tested_v[1]; // instance
templates_verilog_class.generate(structure_verilog[1],options_ver_i).then(
                        out =>{ check(expected_verilog[1],out,tested_v[1],language[1]); });
options_ver_s['type'] = tested_v[2]; // signals
templates_verilog_class.generate(structure_verilog[2],options_ver_s).then(
                        out =>{ check(expected_verilog[2],out,tested_v[2],language[1]); });

let mix_templates_verilog_class = templates_verilog.get_template(Codes.TYPES.MIX_COMPONENT,language[1]);                        
options_ver_c_mix['type'] = tested_v[3]; // mix component
mix_templates_verilog_class.generate(structure_verilog[3],options_ver_c_mix).then(
                        out =>{ check(expected_verilog[3],out,tested_v[3],language[1]); });
options_ver_i_mix['type'] = tested_v[4]; // mix instance
mix_templates_verilog_class.generate(structure_verilog[4],options_ver_i_mix).then(
                        out =>{ check(expected_verilog[4],out,tested_v[4],language[1]); });

function check(expected, out,tested,language) {
  console.log('****************************************************************');
  if(expected.replace(/\n/g,'').replace(/ /g,'').replace(/\r/g, '') 
          === out.replace(/\n/g,'').replace(/ /g,'').replace(/\r/g, '')){
    console.log("Testing... " + tested +" "+language+": Ok!".green);
  }
  else{
    console.log("Testing... " + tested +" "+language+": Fail!".red);
    if (process.argv[2] === 'out') {
      fs.writeFileSync(__dirname + '/examples/'+process.argv[2]+'/example_'+out+'.txt', out, 'utf8');
      console.log(out);
    }
    throw new Error('Test error.');
  }
}