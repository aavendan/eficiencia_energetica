import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() isModalOpen: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() text: string;
  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
