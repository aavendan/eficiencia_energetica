import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { DataService } from 'src/app/provider/data.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  entries: number = 5;
  loading: boolean = false;
  projects: any[] = [];
  dataTableMessages = {
    emptyMessage: 'No se ha guardado ningún proyecto aún',
    totalMessage: 'proyectos',
  };
  response: any[] = [];
  error: string = '';

  constructor(
    private router: Router,
    private api: DataService
  ) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  async loadProjects() {
    this.loading = true;
    const response = await this.api.getProjectsAsync();
    this.projects = response.map((project: any) => ({
      name: project.name,
      efficiency: this.getEficiency(project.output),
      ownerName: project.input?.Proyecto?.propietario?.nombre || 'Sin nombre',
      technicianName: project.input?.Proyecto?.tecnico?.nombre || 'Sin nombre',
      updatedAt: project.updated_at,
    }));
    this.loading = false;
  }

  getEficiency(efficiency: number) {
    if (efficiency == undefined) {
      return '-'
    }
    return `${efficiency}%`;
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }

  viewProject(project) {
    // add project name on query params
    this.router.navigate(['/eficiency/simulator'], { queryParams: { name: project.name } });
  }

  async deleteProject(project) {
    await this.api.deleteProjectAsync(project.name);
    this.projects = this.projects.filter(p => p.name != project.name);
  }

  async downloadProject(project) {
    try {
      await this.api.downloadProject(project.name);
    } catch (error) {
      this.error = error.message;
    }
  }
}
