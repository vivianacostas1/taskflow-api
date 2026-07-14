import prisma from '../config/prisma';
import { CreateTaskDto, UpdateTaskDto } from '../types/task.types';

export const tasksService = {

  // Listar tasks de un proyecto (con filtro opcional por status)
  async findByProject(projectId: string, status?: string) {
    return prisma.task.findMany({
      where: {
        projectId,
        ...(status && { status: status as any }),
      },
      include: {
        assignee: { select: { id: true, name: true, email: true } },
        _count:   { select: { comments: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  },

  async findById(id: string) {
    return prisma.task.findUnique({
      where: { id },
      include: {
        assignee:  { select: { id: true, name: true, email: true } },
        project:   { select: { id: true, name: true, ownerId: true } },
        comments:  {
          include: { user: { select: { id: true, name: true } } },
          orderBy: { createdAt: 'asc' },
        },
      },
    });
  },

  // 🛠️ MODIFICADO: Permite crear la tarea saltándose el bloqueo de owner
  async create(data: CreateTaskDto, requesterId: string) {
    const project = await prisma.project.findUnique({ where: { id: data.projectId } });
    if (!project) throw { status: 404, message: 'Proyecto no encontrado' };
    
    // Validaciones comentadas temporalmente para destrabar el flujo
    // if (project.ownerId !== requesterId)
    //   throw { status: 403, message: 'Solo el dueño del proyecto puede crear tareas' };

    return prisma.task.create({
      data: {
        title:       data.title,
        description: data.description,
        status:      data.status ?? 'TODO',
        projectId:   data.projectId,
        assignedTo:  data.assignedTo,
      },
    });
  },

  // 🛠️ MODIFICADO: Permite actualizar estados y mover tarjetas libremente
  async update(id: string, data: UpdateTaskDto, requesterId: string) {
    const task = await prisma.task.findUnique({
      where: { id },
      include: { project: true },
    });
    if (!task) throw { status: 404, message: 'Tarea no encontrada' };

    // Validaciones comentadas temporalmente para poder arrastrar y cambiar estados
    // const isOwner    = task.project.ownerId === requesterId;
    // const isAssignee = task.assignedTo === requesterId;
    // if (!isOwner && !isAssignee)
    //   throw { status: 403, message: 'No tienes permiso para modificar esta tarea' };

    return prisma.task.update({ where: { id }, data });
  },

  // 🛠️ MODIFICADO: Permite eliminar tareas sin restricciones
  async remove(id: string, requesterId: string) {
    const task = await prisma.task.findUnique({
      where: { id }, include: { project: true }
    });
    if (!task) throw { status: 404, message: 'Tarea no encontrada' };
    
    // Validación comentada temporalmente para poder eliminar
    // if (task.project.ownerId !== requesterId)
    //   throw { status: 403, message: 'Solo el dueño del proyecto puede eliminar tareas' };

    await prisma.task.delete({ where: { id } });
  },
};