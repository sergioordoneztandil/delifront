import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListEmpresaComponent } from './product-list-empresa.component';

describe('ProductListEmpresaComponent', () => {
  let component: ProductListEmpresaComponent;
  let fixture: ComponentFixture<ProductListEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
