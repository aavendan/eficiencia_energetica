import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() isModalOpen: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() text: string;
  @Input() title: string;
  @Output() closeModal = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  onCloseModal() {
    this.isModalOpen = false;
    this.closeModal.emit();
  }
}
