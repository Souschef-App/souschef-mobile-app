﻿using Microsoft.AspNetCore.Mvc;
using souschef.server.Data.DTOs;
using souschef.server.Data.Models;
using souschef.server.Data.Repository.Contracts;
using souschef.server.Helpers;

namespace souschef.server.Controllers
{
    [ApiController]
    [Route("api/recipe")]
    public class RecipeController : Controller
    {
        private readonly IRecipeRepository m_recipeRepository;

        public RecipeController(IRecipeRepository _recipeRepository)
        {
            m_recipeRepository = _recipeRepository;
        }

        [HttpPost()]
        public IActionResult AddRecipe([FromBody]RecipeDTO _dto)
        {

            if(_dto.OwnerId != null && _dto.Steps != null)
            {
                var recipe = new Recipe()
                {
                    Id = Guid.NewGuid(),
                    Duration = (int)_dto.Steps!.Sum(item => item.TimeEstimate),
                    Date = Conversions.GetUnixTimeStamp(DateTime.Now),
                    Tasks = Array.ConvertAll(_dto.Steps, new Converter<Step, Data.Models.Task>(delegate (Step x) { return Conversions.ToTask(x)!; })).ToList() //Fix Null Issue
                };

                m_recipeRepository.AddRecipe(recipe);
                return Ok();

            }
            else
            {
                return new ContentResult() { Content = "Invalid Owner Id", StatusCode = 404 };
            }
        }

        [HttpGet("GetPublicRecipes")]
        public ActionResult<IEnumerable<Recipe>> GetAllRecipes()
        {   
            var recipes = m_recipeRepository.GetAll(Guid.Parse("CUSTOMALLID"));
            if(recipes != null)
            {
                return Ok(recipes);
            }
            else
            {
                return new ContentResult() { Content = "Recipes Not Found", StatusCode = 404 };
            }
        }

        [HttpGet("GetMyRecipes")]
        public ActionResult<IEnumerable<Recipe>> GetMyRecipes(string _ownerId)
        {
            var recipes = m_recipeRepository.GetAll(Guid.Parse(_ownerId));

            if (recipes != null)
            {
                return Ok(recipes);
            }
            else
            {
                return new ContentResult() { Content = "Recipes Not Found", StatusCode = 404 };
            }
        }

        [HttpPatch()]
        public ActionResult ModifyRecipe([FromBody] RecipeDTO _dto)
        {
            if (_dto != null && _dto.OwnerId != null && _dto.Steps != null)
            {
                var recipe = new Recipe()
                {
                    Id = Guid.NewGuid(),
                    Duration = (int)_dto.Steps!.Sum(item => item.TimeEstimate),
                };

                m_recipeRepository.Modify(recipe);
                return Ok();
            }
            else
            {
                return new ContentResult() { Content = "Delete Failed", StatusCode = 404 };
            }
        }

        [HttpDelete()]
        public ActionResult DeleteRecipe(string _recipeId)
        {
            Recipe? recipe = m_recipeRepository.GetRecipe(Guid.Parse(_recipeId));

            if (recipe != null)
            {
                m_recipeRepository.DeleteRecipe(recipe);
                return Ok();
            }
            else
            {
                return new ContentResult() { Content = "Delete Failed", StatusCode = 404 };
            }
        }

    }
}
