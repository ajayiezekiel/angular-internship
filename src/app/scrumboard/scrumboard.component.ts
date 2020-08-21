import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScrumdataService } from '../scrumdata.service'
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-scrumboard',
  templateUrl: './scrumboard.component.html',
  styleUrls: ['./scrumboard.component.css']
})
export class ScrumboardComponent implements OnInit {

  tftw = [];
  tftd = [];
  verify = [];
  done = [];

  constructor(private _route: ActivatedRoute, private _scrumdataService: ScrumdataService) { }

  project_id = 0;
  _participants = []

  ngOnInit(): void {
    this.project_id = parseInt((this._route.snapshot.paramMap.get('project_id')));
    this.getProjectGoals();
    this.getStatus();
  }



  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  getProjectGoals() {
    this._scrumdataService.allProjectGoals(this.project_id).subscribe(
      data => {
        console.log('SUCCESS', data);
        this._participants = data['data'];
      },
      error => {
        console.log('ERROR', error);
      }
    )
  }

  getStatus() {
    for (const participant of this._participants) {
      for (const goal of participant['scrumygoal_set']) {
        if (goal['status'] === 0 && goal['user'] == participant['id']) {
          this.tftw.push({id: goal['id'], user: goal['user'], status: goal['status'], name: goal['name'], p_id: participant['id']})
        } 
        
        else if (goal['status'] === 1 && goal['user'] == participant['id']) {
          this.tftd.push({id: goal['id'], user: goal['user'], status: goal['status'], name: goal['name'], p_id: participant['id']})
        }
        
        else if (goal['status'] === 2 && goal['user'] == participant['id']) {
        this.verify.push({id: goal['id'], user: goal['user'], status: goal['status'], name: goal['name'], p_id: participant['id']})
        }
        
        else if (goal['status'] === 3 && goal['user'] == participant['id']) {
        this.done.push({id: goal['id'], user: goal['user'], status: goal['status'], name: goal['name'], p_id: participant['id']})
        }
      }
    }
  }

}
