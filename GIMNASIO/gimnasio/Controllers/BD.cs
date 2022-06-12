using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using gimnasio.Models;
using System.Data.SqlClient;
using Dapper;

namespace gimnasio.Controllers;

public class BD : Controller
{
    private readonly ILogger<BD> _logger;

    public BD(ILogger<BD> logger)
    {
        _logger = logger;
    }
    

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}