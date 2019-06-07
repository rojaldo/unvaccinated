import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-modal-component',
    template: `
    <div class="modal-header">
      <h4 class="modal-title">Predicted vs true measures</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <iframe width="100%" height="500" frameborder="0" scrolling="no" src="//plot.ly/~uxiost/1.embed"></iframe>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgbdModalComponent {
    constructor(public activeModal: NgbActiveModal) { }
}
