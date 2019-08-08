import { NgModule } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import {
  AutoCompleteModule,
  BreadcrumbModule,
  ButtonModule,
  CalendarModule,
  CheckboxModule,
  ConfirmDialogModule,
  DropdownModule,
  InputTextModule,
  MenubarModule,
  PanelMenuModule,
  SidebarModule,
  FieldsetModule,
  MultiSelectModule,

} from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import {BlockUIModule} from 'primeng/blockui';
@NgModule({
  exports: [
    MenubarModule,
    SidebarModule,
    PanelMenuModule,
    BreadcrumbModule,
    InputTextModule,
    DropdownModule,
    AutoCompleteModule,
    TableModule,
    CheckboxModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    FileUploadModule,
    CalendarModule,
    FieldsetModule,
    MultiSelectModule,
    BlockUIModule
  ]
})
export class SharedPrimengModule {}
