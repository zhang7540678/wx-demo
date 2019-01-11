import $ from 'jquery';
require('./css/base.css');
import _ from 'lodash';
import vue from 'vue';
import vuex from 'vuex';
import vueRouter from 'vue-router'
import elmentUI from 'element-ui';
import axios from 'axios';

var app = document.getElementById("app");
var div = document.createElement("div");
div.innerHTML = 'webpack demo +_+ -_- ^_^';

app.appendChild(div);
$("#app").css('color', 'green')

var img = document.createElement('img');
img.src = require('./images/kefu.png');

app.appendChild(img);