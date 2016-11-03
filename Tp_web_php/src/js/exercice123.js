/**
 * Created by lebigninpo on 06/10/16.
 */
document.addEventListener('DOMContentLoaded',function () {
    var suppress = document.querySelectorAll("[type='supprimer']");
    var modif = document.querySelectorAll("[type='modifier']");
    var ajout = document.querySelector("[type='ajouter'");

    for(var i=0; i<suppress.length;i++){
        suppress[i].addEventListener('click',supprimer)
    }

    for(var i=0; i<modif.length;i++){
        modif[i].addEventListener('click',modifier)
    }

    ajout.addEventListener('click',ajouter)
    moyenne();
});

function moyenne() {
    var $notes = document.querySelectorAll("[type='note']");
    var $moy = document.querySelector("[type = 'moyenne']");
    var $moyenne = 0;
    if($notes.length!=0){
        for(var i=0;i<$notes.length;i++){
            $moyenne = $moyenne + Number($notes[i].innerHTML);
        }
        $moyenne = $moyenne/($notes.length);
        $moy.innerHTML= " <td class='text-center'>" + $moyenne+ "</td>"
    }else{
        $moy.innerHTML= " <td class='text-center'> Aucune matière</td>"
    }

}

function enregistrer($matiere, $note) {
    var i = 0;
    var body= document.querySelector('tbody');
    var tr=document.createElement('tr');
    tr.innerHTML="<td  type='matiere'>" + $matiere + "</td>" +
        "   <td type='note'' class='text-center'>" + $note + "</td>" +
        "   <td class='text-center'>" +
        "   <img src='images/edit.png' type='modifier'' width='30' height='30'>"+
        "<img src='images/del.png' type='supprimer' width='30' height='30' >"
        "   </td>" ;
    tr.querySelector("[type='modifier']").addEventListener('click',modifier);
    tr.querySelector("[type='supprimer']").addEventListener('click',supprimer);
    body.appendChild(tr);
    moyenne();
}

function supprimer() {
    var ligne=this.parentNode.parentNode;
    document.querySelector('tbody').removeChild(ligne);
    moyenne();
}


function modifier() {
    var $ligne=this.parentNode.parentNode;
    var $newNote, $newMatiere;
    var $note = $ligne.querySelector("[type = 'note']").innerHTML;
    var $matiere =$ligne.querySelector("[type = 'matiere']").innerHTML;
    do {
        $newMatiere = prompt("Modifier le nom de la matière : ", $matiere);
    }while ($newMatiere == "");
    var $test;
    do {
        $test = prompt("Modifier la note",$note);
        $newNote = Number($test);
    }while (!(0 <= $newNote & $newNote <= 20 && $test!=''));

    if($newMatiere != null && $newNote != 0) {
        $ligne.querySelector("[type = 'matiere']").innerHTML=$newMatiere;
        $ligne.querySelector("[type = 'note']").innerHTML=$newNote;
        moyenne();
    }
}

function ajouter() {
    var $matiere , $note,$test;

    do{
        $matiere = prompt("Entrer le nom de la matière : ");
    }while($matiere=="");
    if($matiere!= null){
        do {
            $note = prompt("Entrez une note compris entre 0 et 20 ");
            if($note==null){
                break;
            }else{
                $test =Number($note);
            }
        }while (!(0 <= $test && $test <= 20 && $note!=''));
        if($note!=null){
            enregistrer($matiere, $note);
            moyenne();
        }
    }
}