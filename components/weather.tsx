export function Weather({ temperature }: { temperature: number }) {
    return (
        <>
            <p className="text-2xl font-medium text-[#cccccc]">{temperature}°</p>
            <img src="https://s3-alpha-sig.figma.com/img/7c05/c9bc/391c1e0efa8319f45cc455c38673a592?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XhZP23YLo5EhEitFOjWPoqLCeMFb-j0HdjhMwhaiTiR6fcqBKfU8aJl-sYMgnz2GFZwtdfuWYBHCf~aI44J6wsBo2HKzTqw74BLRSyAmOT7Gc50PzWsdaFyRaZzDhIOzNxPR0akmPn5qVlDvX7-zsMz6gAToJPWJNrfSod9Ttqs6DdfyyxttBZgjhJtJSBXKEZejNabhrMha87fw0bgqZ3lrm~NXrzZu3qf8xQ84AKwGbKJANSNPcopUo8~Qw-iOL4fauNcxTXlXzDxPakOEl~0KSGGUpQI6YzLCggq01tDMG7IsP-oISQ3G-EKH6lQPHB3lrGvdn2lcPXXmnbsDrA__" width={40} alt="weather-gif" />
        </>
    );
}