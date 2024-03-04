import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Post, PostServices } from '../../../services/post.services';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrl: './newpost.component.css',
})
export class NewpostComponent implements OnInit {
  postForm: FormGroup;

  @Output() closeModalEvent = new EventEmitter<void>();
  @Input() showModal: boolean | undefined;
  constructor(private fb: FormBuilder, private postService: PostServices) {
    this.postForm = this.fb.group({
      postType: ['text'],
      textContent: [''],
      imageDescription: [''],
      imageURL: [''],
      pollQuestion: [''],
      pollOptions: this.fb.array([]),
    });
  }

  ngOnInit(): void {}

  get pollOptionsControls(): FormArray {
    return this.postForm.get('pollOptions') as FormArray;
  }
  addPollOption() {
    this.pollOptionsControls.push(this.fb.control(''));
  }

  removePollOption(index: number) {
    this.pollOptionsControls.removeAt(index);
  }
  closeModal() {
    console.log('close modal in new post');
    this.closeModalEvent.emit();
  }
  onSubmit() {
    const newPostFormData = this.postForm.value;
    console.log(newPostFormData);
    const postData = {
      userId: '',
      posts: {
        textpost: {
          content: newPostFormData.textContent,
        },
        imagepost: {
          imageUrl: newPostFormData.imageURL,
          description: newPostFormData.imageDescription,
        },
        poll: {
          question: newPostFormData.pollQuestion,
          options: newPostFormData.pollOptions,
        },
      },
    };
    this.postService.SendPost(postData).subscribe();
    this.closeModal();
  }
}
