using System.ComponentModel.DataAnnotations;

namespace backend.Domain.Enums;

public enum SportType
{
    [Display(Name = "Fotboll")]
    Fotboll = 1,

    [Display(Name = "Innebandy")]
    Innebandy = 2,

    [Display(Name = "Ishockey")]
    Ishockey = 3,

    [Display(Name = "Ridsport")]
    Ridsport = 4,

    [Display(Name = "Gymnastik")]
    Gymnastik = 5,

    [Display(Name = "Handboll")]
    Handboll = 6,

    [Display(Name = "Friidrott")]
    Friidrott = 7,

    [Display(Name = "Simning")]
    Simning = 8,

    [Display(Name = "Basket")]
    Basket = 9,

    [Display(Name = "Volleyboll")]
    Volleyboll = 10,

    [Display(Name = "Längdskidåkning")]
    Langdskidakning = 11,

    [Display(Name = "Alpint (Skidor)")]
    AlpintSkidor = 12,

    [Display(Name = "Bordtennis")]
    Bordtennis = 13,

    [Display(Name = "Badminton")]
    Badminton = 14,

    [Display(Name = "Bandy")]
    Bandy = 15,

    [Display(Name = "Dans")]
    Dans = 16,

    [Display(Name = "Tennis")]
    Tennis = 17,

    [Display(Name = "Konstsim")]
    Konstsim = 18
}
