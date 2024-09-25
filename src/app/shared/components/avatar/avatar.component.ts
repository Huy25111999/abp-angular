import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  @Input() control: AbstractControl;
  @Output() avatar = new EventEmitter();
  constructor() {}
  ngOnInit(): void {
    console.log('contrl', this.control);
  }

  activeColor: string = 'green';
  baseColor: string = '#ccc';
  overlayColor: string = 'rgba(255,255,255,0.5)';

  dragging: boolean = false;
  loaded: boolean = false;
  imageLoaded: boolean = false;
  imageSrc: string = '';

  errMessage: boolean = false;

  handleDragEnter() {
    console.log('handleDragEnter');
    this.dragging = true;
  }

  handleDragLeave() {
    console.log('handleDragLeave');
    this.dragging = false;
  }

  handleDrop(e) {
    console.log('e---', e);

    e.preventDefault();
    this.dragging = false;
    this.handleInputChange(e);
  }

  handleImageLoad() {
    console.log('handleImageLoad');

    this.imageLoaded = true;
  }

  handleInputChange(e) {
    console.log('input change');
    console.log('this.control2', this.control);

    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    console.log('imageSrc', this.imageSrc);
    this.loaded = false;
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    console.log('_handleReaderLoaded');
    var reader = e.target;
    this.imageSrc = reader.result;
    this.loaded = true;
    this.avatar.emit(this.imageSrc);
  }

  cancel() {
    this.imageSrc = '';
  }

  avatarValue: any;
  uploadFileImage(event: any) {
    console.log('event', event);

    this.avatarValue = event;
    this.avatar.emit(event);
  }

  // Kiểm tra trường avatar có lỗi không
  isInvalid(): boolean {
    return !this.avatarValue; // Giả sử trường avatar không hợp lệ nếu nó không có giá trị
  }
}
