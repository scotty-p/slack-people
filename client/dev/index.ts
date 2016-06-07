/// <reference path="../../typings/index.d.ts" />

import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router';
import {AppComponent} from './people/components/app.cmp'

bootstrap(AppComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS]);
