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
  response: any[] = [
    {
      name: 'Proyecto 1',
      efficiency: 0.5,
      ownerName: 'Juan Perez',
      technicianName: 'Pedro Perez',
      updatedAt: '01-01-2023 10:00',
    },
    {
      name: 'Proyecto 2',
      efficiency: 0.23456,
      ownerName: 'Marta Picasso',
      technicianName: 'Pedro Perez',
      updatedAt: '02-03-2023 12:50',
    },
    // Add more with random data
    {
      name: 'Proyecto 3',
      efficiency: 0.43456,
      ownerName: 'Maria Perez',
      technicianName: 'Ana Perez',
      updatedAt: '02-05-2023 12:30',
    },
    {
      name: 'Proyecto 4',
      efficiency: 0.28456,
      ownerName: 'Marta Picasso',
      technicianName: 'Pedro Perez',
      updatedAt: '03-03-2023 12:50',
    },
    {
      name: 'Proyecto 5',
      efficiency: 0.23456,
      ownerName: 'Marta Picasso',
      technicianName: 'Pedro Perez',
      updatedAt: '02-03-2023 12:50',
    },
    {
      name: 'Proyecto 6',
      efficiency: 0.23456,
      ownerName: 'Marta Picasso',
      technicianName: 'Pedro Perez',
      updatedAt: '02-03-2023 12:50',
    },
    {
      name: 'Proyecto 7',
      efficiency: 0.23456,
      ownerName: 'Marta Picasso',
      technicianName: 'Pedro Perez',
      updatedAt: '02-03-2023 12:50',
    },
    {
      name: 'Proyecto 8',
      efficiency: 0.23456,
      ownerName: 'Marta Picasso',
      technicianName: 'Pedro Perez',
      updatedAt: '02-03-2023 12:50',
    },
    {
      name: 'Proyecto 9',
      efficiency: 0.23456,
      ownerName: 'Marta Picasso',
      technicianName: 'Pedro Perez',
      updatedAt: '02-03-2023 12:50',
    }
  ];

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
}
