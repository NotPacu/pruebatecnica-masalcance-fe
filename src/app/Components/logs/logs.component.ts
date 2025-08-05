import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { LogDTO } from 'src/app/Interface/Models/log-dto';
import { LogsService } from 'src/app/Services/logs.service';
import { EditLogComponent } from './edit-log/edit-log.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsersService } from 'src/app/Services/users.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css'],
})
export class LogsComponent implements OnInit {
  Logs: LogDTO[] = [];
  loading : boolean = false;

  constructor(
    private logService: LogsService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private userService : UsersService,
  ) {}

  ngOnInit(): void {
    this.getLogs(); //Cargar datos iniciales
  }

  // Obtener los Logs
  getLogs() {
    this.logService.getLogs().subscribe({
      next: (response) => {
        this.Logs = response;
        this.Logs.sort((a, b) => {
          return (
            new Date(b.query_date).getTime() - new Date(a.query_date).getTime()
          );
        });
      },
    });
  }

  // Obtener clase para darle color a los Estados
  // 2xx verde
  // 3xx y 4xx naraja
  // 5xx Rojo
  // de resto gris
  getClassColorForStatus(statusCode: string): string {
    if (statusCode.startsWith('2')) {
      return 'status-success'; // Verde para 2xx
    } else if (statusCode.startsWith('3')) {
      return 'status-client-error'; // Naranja para 4xx
    } else if (statusCode.startsWith('4')) {
      return 'status-client-error'; // Naranja para 4xx
    } else if (statusCode.startsWith('5')) {
      return 'status-server-error'; // Rojo para 5xx
    } else {
      return 'status-unknown'; // Gris para otros
    }
  }

  // Metodo eliminar con confirm dialog
  onDelteLog(id: string) {
    this.confirmationService.confirm({
      message: 'Está seguro que desea eliminar este registro?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.logService.deleteLogs(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Eliminado',
              detail: 'El log se eliminó correctamente',
            });
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo eliminar el log',
            });
          },
        });
      },
    });
  }

  // Metodo para Editar con Dialog
  onEditLog(id: String) {
    const ref = this.dialogService.open(EditLogComponent, {
      header: 'Editar Log',
      width: '30%',
      data: { log: this.Logs.find((log) => log.id === id) },
    });

    ref.onClose.subscribe((result) => {
      this.getLogs();
    });
  }

  // Simula errores 
  // Aqunque algunas solo dan respuesta null o [] {}
  onSimularErrores(){
    this.loading = true
    this.userService.getSimularErrores().subscribe({
      next : (response)  => {
        this.loading = false;
        this.getLogs();
      }
    });
  }
}
