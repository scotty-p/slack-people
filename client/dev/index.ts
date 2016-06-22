/// <reference path="../../typings/index.d.ts" />

import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import {AppComponent} from './people/components/app.cmp'
import {APP_ROUTER_PROVIDER} from "./people/routes";
import {AuthGuard} from "./people/auth-guard";
import {AuthService} from "./people/services/auth.service";

bootstrap(AppComponent, [HTTP_PROVIDERS, APP_ROUTER_PROVIDER, AuthService, AuthGuard]);
