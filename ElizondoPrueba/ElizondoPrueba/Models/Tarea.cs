using System;
using System.Collections.Generic;

namespace ElizondoPrueba.Models;

public partial class Tarea
{
    public int IdTarea { get; set; }

    public string? Titulo { get; set; }

    public string Descripcion { get; set; } = null!;

    public string Estado { get; set; } = null!;

    public DateOnly Fecha { get; set; }
}
