export default function RegistrationForm() {
    return (
        <div>
            <form>
                <input type="text"/>
                <input type="email"/>
                <input type="tel"/>

                <input type="radio" id="Frontend-developer" name="position" value="Frontend developer"/>
                <label htmlFor="Frontend-developer">Frontend developer</label><br/>
                <input type="radio" id="Backend-developer" name="position" value="Backend developer"/>
                <label htmlFor="Backend-developer">Backend developer</label><br/>
                <input type="radio" id="Designer" name="position" value="Designer"/>
                <label htmlFor="Designer">Designer</label>
                <input type="radio" id="QA" name="position" value="QA"/>
                <label htmlFor="QA">QA</label>

                <input type="file"/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}