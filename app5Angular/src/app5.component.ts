import { Component, forwardRef, Inject } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState, CounterActions } from "./store";
import {Globals} from "./globals.service";
import * as angularImg from "../assets/angular-logo.png";

@Component({
	selector: 'app5',
	template: `
    <div style="font-family : montserrat; text-align : center; background-color:black ;color : white;">
		<div style="margin-top: 100px;">
            <img [src]="angularImg" style="width: 100px;"/> <br />
			This is the second App which is written in Angular.
		</div>
        <br />

        <div>
            <b> Count: {{ count }}</b><br/><br/>
            <button (click)="increment()" style="color:forestgreen; background-color:beige; padding:10px;">Local Increment</button>&nbsp;Send a <b>local</b> increment event. This will
            only increase the counter for the current app. <br/><br/>
            
            <button (click)="decrement()" style="color:red; background-color:beige; padding:10px;">Local Decrement</button>&nbsp;Send a <b>local</b> decrement event. This will
            only decrement the counter for the current app. <br/><br/>

            
            <button (click)="globalIncrement()" style="color:forestgreen; background-color:beige; padding:10px;">Global Increment</button>&nbsp;Send a <b>global</b> increment event.
            This will increase the counter for the current app and all other apps that listen to this event. <br/><br/>
            
            <button (click)="globalDecrement()" style="color:red; background-color:beige; padding:10px;">Global Decrement</button>&nbsp;Send a <b>global</b> decrement event.
            This will increase the counter for the current app and all other apps that listen to this event. <br/><br/>
        </div>
		
        
        <br />
        <div style="padding-bottom : 20px">
		<a [routerLink]="['/subroute1']" routerLinkActive="active" style ="color:white;">Angular route 1</a>&nbsp;
		<a [routerLink]="['/subroute2']" routerLinkActive="active" style ="color:white;">Angular route 2</a>
        </div>
		<router-outlet></router-outlet>
        </div>
	`,
})
export class App5 {
    count: number;
    angularImg: any;
    subscription;

    constructor(
        @Inject(forwardRef(() => NgRedux)) private ngRedux: NgRedux<IAppState>,
        @Inject(forwardRef(() => CounterActions)) private actions: CounterActions,
        @Inject(forwardRef(() => Globals)) private globals:Globals) {
        this.subscription = ngRedux.select<number>('count')
            .subscribe(newCount => this.count = newCount);
        this.angularImg = angularImg;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    increment() {
        this.ngRedux.dispatch(this.actions.increment());
    }

    decrement() {
        this.ngRedux.dispatch(this.actions.decrement());
    }

    globalIncrement() {
        this.globals.globalEventDistributor.dispatch(this.actions.increment());
    }

    globalDecrement() {
        this.globals.globalEventDistributor.dispatch(this.actions.decrement());
    }
}
