import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'form-info',
  templateUrl: './form-info.component.html',
  styleUrls: ['./form-info.component.scss']
})
export class FormInfoComponent implements OnInit {

  @Input() title: string;
  @Input() description?: string;
  @Input() image?: string;;
  isModalOpen: boolean = false;
  isFadeShow: boolean = false;
  parsedDescription: string = ''
  constructor() { }

  ngOnInit(): void {
    this.parseDescription();
  }

  parseDescription() {
    const paragraphs = this.description?.split("\n") || [];
    paragraphs
      .filter(p => p.trim())
      .forEach(p => {
        this.parsedDescription += `<p class="text-left">${p.trim()}</p>`;
      });
  }

  openModal($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.isModalOpen = true;
    document.body.classList.add('modal-open');
    setTimeout(() => this.isFadeShow = true, 100);
  }

  closeModal() {
    this.isFadeShow = false;
    document.body.classList.remove('modal-open');
    setTimeout(() => this.isModalOpen = false, 100);
  }

}
