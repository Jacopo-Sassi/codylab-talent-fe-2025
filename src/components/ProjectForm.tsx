import classes from "./ProjectForm.module.css";
export function ProjectForm(){
    return(
        <div className={classes.project_form}>
            <form action="" method="post">
                <label htmlFor="code">Codice progetto</label>
                <input type="text" name="code" id="code" />

                <label htmlFor="name">Nome progetto</label>
                <input type="text" name="name" id="name" />

                <label htmlFor="description">Descrizione progetto</label>
                <input type="text" name="description" id="description" />

                <label htmlFor="startDate">Data di inizio</label>
                <input type="text" name="startDate" id="startDate" />

                <label htmlFor="duration">Durata</label>
                <input type="text" name="duration" id="duration" />

                <label htmlFor="manager">Responsabile</label>
                <input type="text" name="manager" id="manager" />

                <label htmlFor="state">Stato del progetto</label>
                <input type="text" name="state" id="state" />

                <button className={classes.addBtn} type="submit">Crea nuovo progetto</button>
            </form>
        </div>
    )
}