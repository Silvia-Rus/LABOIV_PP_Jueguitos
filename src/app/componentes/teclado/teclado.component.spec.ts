/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TecladoComponent } from './teclado.component';

describe('TecladoComponent', () => {
  let component: TecladoComponent;
  let fixture: ComponentFixture<TecladoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TecladoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TecladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
